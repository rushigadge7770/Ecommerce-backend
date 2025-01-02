  async function userLogout(req, res){
    try{
        res.clearCookie('token');
        res.json({ message: 'User logged out successfully',
        error:false,
        success: true,
    data:[]})
    ;

    }
    catch(error){
        res.status(400).json({ message: error.message ,
        error:true,
    success:false  
    });
    }
  }
  
  module.exports = userLogout;