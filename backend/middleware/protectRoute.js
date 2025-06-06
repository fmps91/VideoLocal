const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const protectRoute = async (req,res,next)=>{
    
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({error:"Unauthorized: No token provided"})
        }
        
        const decoded =  jwt.verify(token,process.env.JWTSecret);     
        
        if (!decoded) {
            return res.status(402).json({error:"Unauthorized: Invalid token"})
        }
        
        
        const user= await User.findById(decoded.userId).select("-password");
       
        if (!user) {

            return res.status(403).json({error:"User not found"})
        }

        req.user=user;
        next();

    } catch (error) {
        
        console.log("Error in protectRoute middleware ",error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}

module.exports = {protectRoute}