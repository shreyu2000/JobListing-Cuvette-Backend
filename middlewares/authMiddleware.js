const jwt = require("jsonwebtoken");

const verifyJwt = (req,res,next)=>{

    try {
        const token = req.header("Authorization");
        // It extracts the JWT from the Authorization header of the incoming HTTP request.


    if(!token){
        return  res.status(401).json({message : "Unauthorized User"});
        //If there is no token present in the request header, it responds with a 401 Unauthorized status and a JSON object indicating that the user is unauthorized.
    }

    const decode = jwt.verify(token , process.env.JWt_SECRET);
    //It attempts to verify the JWT using the jwt.verify method, which decodes the token using the secret key (process.env.JWt_SECRET). If the verification is successful, the decoded payload is stored in the decode variable.



    if(!decode) return res.status(401).json({message : "Invalid Token"});
    req.body.userId =decode.userId; 
    next();

    } catch (error) {
     res.status(401).json({message : "Invalid Token"});

    }
  
}

module.exports  = verifyJwt;