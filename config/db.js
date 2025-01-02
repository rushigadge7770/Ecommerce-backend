const mongoose = require('mongoose');

async function connectDB(){
    try{
        mongoose.connect(process.env.MONGODB_URL)
       
    }
    catch(err){
        console.error('Failed to connect to MongoDB');
      
    }
}

module.exports = connectDB;