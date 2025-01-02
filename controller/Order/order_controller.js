const orderModel = require("../../models/orderProductModel");

const orderController = async(request, response) =>{
    try{
        const currentUserId = request.userId

        const orderList = await orderModel.find({ userId : currentUserId})

        response.json({
            data : orderList,
            message: "Order List fetched successfully",
            success: true
        });

    }
    catch(error){
        response.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

module.exports = orderController;