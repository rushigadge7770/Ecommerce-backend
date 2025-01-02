const productModel = require("../../models/productModel")

const getProductController = async(req,res) => {
    try{
 const allProducts = await productModel.find().sort({ createdAt : -1})
 res.status(200).json({
     message : "All products",
     data : allProducts,
     error : false,
     success : true
 })
    }
    catch(err){
        res.status(404).json({
            message : err.message,
            error : true,
            success : false
        })
    }
}

module.exports = getProductController;