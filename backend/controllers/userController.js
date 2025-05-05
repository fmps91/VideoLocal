const User = require("../models/userModel");
//const Notification = require("../models/notificationModel");
const bcrypt = require("bcryptjs");


const deleteUser= async (req,res)=>{
    
    try {
        
        /* const storage = multer.diskStorage({
            destination: function (req, file, cb) {
              cb(null, 'upload/')
            },
            filename: function (req, file, cb) {
              const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
              cb(null, file.fieldname)
            }
        }) */
        const {id}=req.params;
        const userToModify= await User.findById(id);  
        
        if (!userToModify) {
            return res.status(400).json({error: "User not found"})
        }

        await fs.rmdir("upload/"+userToModify.username);

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.log("Error in deleteUser", error.message);
        res.status(500).json({error: error.message})
    }
}

const getAllUser= async (req,res)=>{
    
    try {
        
        /* const storage = multer.diskStorage({
            destination: function (req, file, cb) {
              cb(null, 'upload/')
            },
            filename: function (req, file, cb) {
              const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
              cb(null, file.fieldname)
            }
        }) */
        const users= await User.find()

        res.status(200).json({ message: "User deleted successfully" ,users});
    } catch (error) {
        console.log("Error in deleteUser", error.message);
        res.status(500).json({error: error.message})
    }
}



module.exports={deleteUser,getAllUser}