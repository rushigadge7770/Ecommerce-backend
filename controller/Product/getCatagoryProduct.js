const productModel = require("../../models/productModel")

const getCategoryProductController = async(req,res) => {
    try{
        const productCategory = await productModel.distinct("category")
 // array to store one product from category
        const productByCategory = []

        for(const category of productCategory){
            const product = await productModel.findOne({category})
            
            if(product){
                productByCategory.push(product) 
            }
        }
        res.status(200).json({
            message : "Products by category",
            data : productByCategory,
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

module.exports = getCategoryProductController;