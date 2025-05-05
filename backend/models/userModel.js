const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    videos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Video",
            default:[]
        }
    ],
    
    profileImg:{
        type:String,
        default:"",
    },
    coverImg:{
        type:String,
        default:"",
    },
    bio:{
        type:String,
        default:"",
    },
    link:{
        type:String,
        default:"",
    },
    
    },
    {timestamps:true}
);

const User=mongoose.model("User",userSchema)
module.exports=User;