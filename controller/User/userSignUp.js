const UserModel = require('../../models/userModel')

const bcrypt = require('bcryptjs');
const saltRounds = 10;


async function userSignUpController(req, res, ) {
    try{
        
        const {name , email, password} = req.body;

        const user = await UserModel.findOne({ email });
      
        if(user){
            throw new Error("User already exists")
        }
        if(!name){
            throw new Error("please enter a valid name")
        }
        if(!email){
            throw new Error("Please enter a valid email")
        }
        if(!password){
            throw new Error("Please enter a valid password")
        }
        const myPlaintextPassword = password;

        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(myPlaintextPassword, salt);
        if(!hash){
            throw new Error("something went wrong")
        } 
        const load ={
            ...req.body,
            role :'GENERAL',
            password : hash
        }

        const userData = new UserModel(load)
        const savedUser = await userData.save()
        
        res.status(201).json({
            user : savedUser,
            success : true,
            error :false ,
            message :"User registered successfully",  

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

module.exports = userSignUpController