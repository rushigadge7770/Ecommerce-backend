const addToCartModel = require("../../models/cartProduct")

const updateAddToCardProductController = async (req,res) => {
    try{
        const currentUserId = req.userId
        const addToCartProductId = req?.body?._id
  
    const qty = req.body.quantity

        const updateProduct = await addToCartModel.updateOne({_id : addToCartProductId},{
            ...(qty && {quantity : qty})
        })
        console.log("updated Product", updateProduct )

        res.json({
            message : "Product updated successfully",
            data : updateProduct,
            error : false,
            success : true
        })

    }catch(err){
        res.json({
            message : err.message,
            error : true,
            success : false
        })
    }
}

module.exports = updateAddToCardProductController