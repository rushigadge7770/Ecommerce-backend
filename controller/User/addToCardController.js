const addToCartModel = require("../../models/cartProduct");

const addToCartController = async(req, res) => {
  try {
    const { productId } = req?.body;
    const currentUser = req.userId;
   
    const isProductAvailable = await addToCartModel.findOne({ productId , userId: currentUser })
    console.log( "isproductavailable",isProductAvailable)

if(isProductAvailable){
    return res.json({
        message: "Product already exists in the cart",
        success: false,
        error: true
     
    })
}
    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    }

    const newAddToCart = new addToCartModel(payload)
    const saveProduct = await newAddToCart.save()
    return res.json({
      message: "Product added to the cart",
      data: saveProduct,
      success: true,
      error: false,
    });

  } catch (err) {
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = addToCartController;
