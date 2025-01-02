const productModel = require("../../models/productModel");

const getProductDetailsController = async(req,res)=>{
try{

    const { productId } = req.body;
    const product = await productModel.findById(productId);

    res.status(200).json({
        message: "Product details fetched successfully",
        data: product,
        error: false,
        success: true
     });
    
}

catch(error){
res.status(500).json({ message: error.message,
    error: true,
    success: false
 });
}
}

module.exports = getProductDetailsController;