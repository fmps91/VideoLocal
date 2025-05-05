const router = require("express").Router();

const {getMe,signup,login,logout}=require("../controllers/authcontroller.js");

const {protectRoute}=require("../middleware/protectRoute.js")

router.get("/me", protectRoute, getMe);

router.post("/signup",signup);

router.post("/login",login);

router.post("/logout",logout);

module.exports = router;