const productModel = require("../../models/productModel")

const SearchProductController = async(req,res)=>{
    try{
      const query = req.query.q ;

      if (!query) {
        return res.json({
            message: "Query parameter 'q' is required",
            error: true,
            success: false
        });
    }


      const regex = new RegExp(query,"i","g")
      const product = await productModel.find({
        "$or": [
            {
                productName : regex
            },
            {
                category : regex
            }
        ]
      })
 res.json({
    data : product ,
    message : "search product list",
    error : false,
    success : true


 })

    }
    catch(error){
        res.json({
            message: error.message,
            error: true,
            success: false
        })
    }

}

module.exports = SearchProductController;

