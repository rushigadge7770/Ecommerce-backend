const addToCartModel = require("../../models/cartProduct")

const countAddToCardProductController = async(req,res) => {
    try{
        const userId = req.userId

        const count = await addToCartModel.countDocuments({
            userId : userId
        })

        res.json({
            data : {
                count: count
            },
            message: "Cart count fetched successfully",
            success: true,
             error: false,
            
            
        })

        console.log("count", count)


    }
    catch(error){
        res.json({
            message: "An error occurred while processing your request" || error.message,
            error: true,
            success: false
        })
    }
}

module.exports = countAddToCardProductController;