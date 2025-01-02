const productModel = require("../../models/productModel");

const getCategoryWiseProductController = async (req, res) => {
    try {
        // Ensure `category` is a string by directly extracting it from `req.body` or `req.query`
        const category = req.body.category || req.query.category;
        console.log("categories",category);

        // Check if `category` is defined and is a string
        if (typeof category !== 'string') {
            return res.status(400).json({
                message: "Invalid category type. Expected a string.",
                success: false,
                error: true
            });
        }

        // Fetch products by category
        const productCategory = await productModel.find({ category });

        res.status(200).json({
            message: "Product fetched successfully",
            data: productCategory,
            success: true,
            error: false,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, error: true, success: false });
    }
};

module.exports = getCategoryWiseProductController;
