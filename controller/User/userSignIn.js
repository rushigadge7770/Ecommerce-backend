const UserModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

 async function userSignInController(req, res, next) {
try{
    const {email, password} = req.body
   
    if(!email){
        throw new Error("Please enter a valid email")
    }
    if(!password){
        throw new Error("Please enter a valid password")
    }
    const user = await UserModel.findOne({ email });

    if (!user) {
        throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password)

    // console.log("isMatch", isMatch)
    if(!isMatch) {
        throw new Error("Invalid email or password");
    }

        const tokenData ={
          _id: user._id,
          email: user.email
        }
 // Generate and send JWT
  const token = await jwt.sign(tokenData, process.env.TOTAL_SECRET_KEY, { expiresIn: '1d' });
   // Set JWT cookie in the response
    const tokenOption ={
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',  // Set secure only in production
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',  // SameSite policy
        maxAge: 24 * 60 * 60 * 1000 // 1 day expiration
// Set to 'none' if your site is served over HTTPS 
    }
  res.cookie("token",token ,tokenOption).json({
    message : "User Login successfully",
    data : token,
    error : false,
    success : true,
  })
    

}
catch(err){
    res.json({
        message : err.message || err ,
        error : true,
        success : false
    })
}
 }

 module.exports = userSignInController;