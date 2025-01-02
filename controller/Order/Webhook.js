const Stripe = require("../../config/stripe.js");
const addToCartModel = require("../../models/cartProduct.js");
const orderModel = require("../../models/orderProductModel.js");
const endpointSecret = process.env.WEBHOOK_STRIPE_SECRET_KEY;

// Helper function to fetch line items
async function getLineItems(lineItems) {
  let productItems = [];

  if (lineItems?.data?.length) {
    for (const item of lineItems.data) {
      const product = await Stripe.products.retrieve(item.price.product);
      const productId = product.metadata.productId;

      const productData = {
        productId: productId,
        name: product.name,
        price: item.price.unit_amount / 100,
        quantity: item.quantity,
        image: product.images,
      };
      productItems.push(productData);
    }
  }
  return productItems;
}

// Main webhook function
const webhooks = async (request, response) => {
  const signature = request.headers["stripe-signature"];
  const payloadString = JSON.stringify(request.body);

  let event;

  try {
    // Validate Stripe webhook signature
    event = Stripe.webhooks.constructEvent(
      payloadString,
      signature,
      endpointSecret
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error.message);
    return response.status(400).json({
      message: "Webhook signature verification failed",
      error: true,
      success: false,
    });
  }

  // Handle Stripe webhook event
  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;

        // Fetch line items
        const lineItems = await Stripe.checkout.sessions.listLineItems(
          session.id
        );

        const productDetails = await getLineItems(lineItems);

        // Prepare order details
        const orderDetails = {
          productDetails,
          email: session.customer_email,
          userId: session.metadata.userId,
          paymentDetails: {
            paymentId: session.payment_intent,
            payment_method_type: session.payment_method_types,
            payment_status: session.payment_status,
          },
          shipping_options: session.shipping_options?.map((s) => ({
            ...s,
            shipping_amount: s.shipping_amount / 100,
          })) || [],
          total_amount: session.amount_total / 100,
        };

        // Create order in database
        const newOrder = new orderModel(orderDetails);
        const saveOrder = await newOrder.save();

        if (saveOrder?.id) {
          // Remove items from cart if order is saved
          await addToCartModel.deleteMany({
            userId: session.metadata.userId,
          });
        }

        console.log("Order created successfully:", saveOrder);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    response.status(200).send();
  } catch (error) {
    console.error("Error handling webhook event:", error.message);
    response.status(500).json({
      message: "Internal server error while processing webhook",
      error: true,
      success: false,
    });
  }
};

module.exports = webhooks;
