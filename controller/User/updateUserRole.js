const UserModel = require("../../models/userModel");

async function updateUserRole(req, res ) {
    try{
        const sessionUser = req.userId


  const { userId, name,email,role } = req.body;
  const payload = {
    ...(email &&{email : email}),
    ...(name && { name : name}),
    ...(role && { role : role}),
    }
    // Check if the authenticated user is the owner of the user to update
    const user =await UserModel.findById(sessionUser)
    console.log("user-role", user.role)

    const updatedUser = await UserModel.findByIdAndUpdate(userId,payload)
    res.status(200).json({
            message: "User role updated successfully",
            data: updatedUser,
            success: true,
        });
}
    catch(error){
        res.status(400).json({
             message: error.message || error, 
             error: true, 
             success: false });
    }


}
module.exports = updateUserRole