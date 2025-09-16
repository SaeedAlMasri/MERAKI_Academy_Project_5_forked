const jwt = require("jsonwebtoken")


const authentication = async(req,res,next)=>{
try{
    if(req.headers.authorization){
     const token = req.headers.authorization.split(" ").pop();
      const verify = await jwt.verify(token,process.env.SECRET);

      if(verify){
        req.token = verify;
        next();
      }

      else{
        res.status(403).json({
            success:false,
            Message:"invaild token"
        })
      }


    }
    else{
        res.status(403).json({
            success:false,
            Message:"forbidden"
        })

    }


}
catch(err){
    res.status(500).json({
        success:false,
        Message:err.Message
    })

}



}

module.exports = {authentication}