const User = require("../models/userModel")
const {generateTokenAndSetCookie}=require("../lib/utils/generateToken")
const bcrypt=require("bcryptjs")
const fs = require('fs');

const signup = async (req,res)=>{
   
   try {
        const {username,email,password}=req.body

        if(!username){ 
            return res.status(400).json({error:"Require username"})
        }

        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)){
            return res.status(400).json({error:"Invalid email format"})
        }

        const existingUser= await User.findOne({username});
        if(existingUser){
            return res.status(400).json({error:"Username exist"})
        }

        const existingEmail= await User.findOne({email});
        if(existingEmail){
            return res.status(400).json({error:"Email exist"})
        }

        if (password.length < 6) {
            return res.status(400).json({error: "Password have length 6 characters long"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser= new User({
            username,
            email,
            password:hashedPassword
        });

        const dir="upload/"+username
            
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

        if (newUser) {
            await newUser.save();
            res.status(200).json({
                _id:newUser._id,
                username:newUser.username,
                email: newUser.email,
                videos: newUser.videos,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg
            })

            
            
        } else {
            res.status(400).json({error:"Invalid user data"})
        }
   } catch (error) {
        console.log("Error in signup controller ",error.message)
        res.status(500).json({error:"Internal Server Error"})
   }

}

const login= async (req,res)=>{

    try {
        const {username,password}=req.body;
        //console.log("username: ",username,"  password: ",password)
        const user= await User.findOne({username});
        const isPasswordCorrect= await bcrypt.compare(password,user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({error:"Invalid username or password"})
        }

        generateTokenAndSetCookie(user._id,user.username,res);

        
        res.status(200).json({
            _id:user._id,
            username:user.username,
            videos: user.videos,
            profileImg: user.profileImg,
            coverImg: user.coverImg
        })
    } catch (error) {
        console.log("Error in login controller ",error.message)
        res.status(500).json({error:"Internal Server Error"})
    }

}

const logout=async (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({menssage: "Logged out succesfully"})
    } catch (error) {
        console.log("Error in logout controller ",error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}

const getMe=async (req,res)=>{
    try {
        const user= await User.findById(req.user._id).select("-password");
        
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in logout controller ",error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}

module.exports={signup,login,logout,getMe}