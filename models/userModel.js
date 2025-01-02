const mongoose = require('mongoose');

const userSchema =  new mongoose.Schema({
    name : String,
    email : {
        type: String,
    required : true,
    unique : true
    },
    password :String,
    profilePic : String,
    role : String
      
    
  
},{
timestamps: true
})

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel;

