const jwt = require("jsonwebtoken");

const verifyJwt = (req,res,next)=>{

    try {
        const token = req.header("Authorization");

    if(!token){
        return  res.status(401).json({message : "Unauthorized User"});
    }

    const decode = jwt.verify(token , process.env.JWt_SECRET);

    if(!decode) return res.status(401).json({message : "Invalid Token"});
    req.body.userId =decode.userId; 
    next();

    } catch (error) {
     res.status(401).json({message : "Invalid Token"});

    }
  
}

module.exports  = verifyJwt;