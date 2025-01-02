const uploadProductPermission = require("../../helper/permission")
const productModel = require("../../models/productModel")

async function updateProductController (req,res){
try{

    if(!uploadProductPermission(req.userId)){
        throw new Error("Permission denied")
    }

    const { _id , ...resBody} = req.body
 
    const updateProduct = await productModel.findByIdAndUpdate(_id, resBody)

    res.json({
        message : "Product updated successfully",
        data : updateProduct,
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

module.exports = updateProductController;