const UserModel = require('../../models/userModel')
async function currentUserDetailsController(req, res, next) {
    try {
 
   const user = await UserModel.findById(req.userId)

res.status(200).json(
    {
        data: user,
        success: true,
        error: false,
        message: "User details fetched successfully"
    }

);

   console.log("user",user)
    } catch (error) {
    res.status(400).json({ message: error.message ,
        error:true,
    success:false  
    });
    }
    next();
}

module.exports = currentUserDetailsController;