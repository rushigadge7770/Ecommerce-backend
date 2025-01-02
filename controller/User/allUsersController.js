 const UserModel = require('../../models/userModel')

async function allUsersController(req,res){
    try{   


//    console.log('all userId',req.userId)
   const allUsers = await UserModel.find()
   console.log('all users',allUsers)


   res.status(200).json({
            message: "All users fetched successfully",
            data: allUsers, // Replace with `users` from the database
           success: true, 
            error: false
            
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

module.exports = allUsersController;