const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.send('User Sign Up Page');
});
// Import the userSignUpController




const authToken = require('../middlewares/authToken');
const allUsersController = require('../controller/User/allUsersController');
const UploadProductCOntroller = require('../controller/Product/uploadProduct');
const getProductController = require('../controller/Product/getProducts');
const updateProductController = require('../controller/Product/updateProduct');
const userSignUpController = require('../controller/User/userSignUp');
const userSignInController = require('../controller/User/userSignIn');
const currentUserDetailsController = require('../controller/User/currentUserDetails');
const userLogout = require('../controller/User/userLogOut');
const updateUserRole = require('../controller/User/updateUserRole');
const getCategoryProductController = require('../controller/Product/getCatagoryProduct');
const getCategoryWiseProductController = require('../controller/Product/getCatagoryWiseProduct');
const getProductDetailsController = require('../controller/Product/getProductDetails');
const addToCartController = require('../controller/User/addToCardController');
const countAddToCardProductController = require('../controller/User/countAddTOCartProduct');
const addToCartViewProductController = require('../controller/addToCartViewProduct');
const updateAddToCardProductController = require('../controller/User/updateAddToCartProduct');
const deleteAddToCartProduct = require('../controller/User/deleteAddToCardController');
const SearchProductController = require('../controller/Product/searchProduct');
const filterProductController = require('../controller/Product/filterProduct');
const paymentController = require('../controller/Order/paymentController');
const webhooks = require('../controller/Order/Webhook');
const orderController = require('../controller/Order/order_controller');
  


router.post("/signup",userSignUpController) 
router.post("/login",userSignInController)
router.get("/user-details", authToken, currentUserDetailsController) // To get user details after login
router.get("/user-logout", userLogout)

// Admin Panel
router.get('/all-users', authToken , allUsersController)
router.post('/update-user', authToken ,updateUserRole)

//upload Routes
router.post('/upload-product', authToken , UploadProductCOntroller)
router.get('/get-products',getProductController)
router.post('/update-product', authToken,updateProductController)
router.get('/get-categoryproduct', getCategoryProductController)
router.post('/category-product', getCategoryWiseProductController)
router.post('/product-details', getProductDetailsController)
router.get("/search", SearchProductController )
router.post("/filter-product", filterProductController)

// user add to cart
router.post("/addtocart", authToken, addToCartController)
router.get("/countaddtoproduct" ,authToken, countAddToCardProductController)
router.get("/viewaddtocardproduct", authToken, addToCartViewProductController)
router.post("/update-card-product", authToken, updateAddToCardProductController)
router.post("/delete-card-product", authToken, deleteAddToCartProduct)

//payment and order
router.post("/checkout",authToken,paymentController)
router.post("/webhook", webhooks) // cli hook
router.get("/order-list", authToken, orderController)

module.exports = router ;