const uploadProductPermission = require("../../helper/permission");
const productModel = require("../../models/productModel");

async function UploadProductCOntroller(req, res) {
  try {

    const sessionUserId = req.userId

    if(!uploadProductPermission(sessionUserId)){
        throw new Error("Permission denied")
    }

    const uploadProduct = new productModel(req.body)
    const saveProduct = await uploadProduct.save()



    return res.status(201).json({
        message : "Product uploaded successfully",
        error : false,
        success : true,
        data : saveProduct,
    
    }) 


  } 
  catch (err) {
    return res.status(400).json({
      message: err.message,
      data: [],
      error: true,
      success: false,
    });
  }
}

module.exports = UploadProductCOntroller;
