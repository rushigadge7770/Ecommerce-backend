const express = require('express');
 const  cors = require('cors');
 const cookieParser = require('cookie-parser')
 require('dotenv').config();
 const connectDB = require('./config/db');
 const route= require("./routes")


 
  const app = express();
  app.use(cors(
    {
      origin: process.env.FRONTEND_URL,
      credentials: true, // enable set cookie
    }
  ));
  app.use(express.json({ limit: '100mb' })); // You can adjust the limit according to your needs
app.use(express.urlencoded({ limit: '100mb', extended: true }));
  app.use(cookieParser());
  app.use("/api",route )




  const PORT = process.env.PORT || 4000;

  

 

  connectDB().then(()=>{app.listen(PORT,()=>{
    console.log('MongoDB Connected...');
    console.log(`Server is running on port ${PORT}`);
  })})
  
  