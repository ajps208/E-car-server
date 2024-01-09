const jwt = require('jsonwebtoken')
const secret = process.env.JWTSECRET

const jwtMiddleware = (req,res,next)=>{
    try{
        const token = req.headers['authorization'].split(" ")[1]
        console.log(token);
        const jwtResponse = jwt.verify(token,secret)
        req.payload = jwtResponse.userId
        next()
    }catch(err){
        res.status(401).json("Access Denied... Please Login!!!")
    }
    
}

module.exports = jwtMiddleware