const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    direction:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true, 
    }
    
    },
    {timestamps:true}
);

const Video=mongoose.model("Video",videoSchema)
module.exports=Video;