const { protectRoute } = require("../middleware/protectRoute");
const { getAllUser, deleteUser, UserUpdate } = require("../controllers/usercontroller.js")
const router = require("express").Router();

router.post('/delete',deleteUser)
router.get('/users',getAllUser)
/* router.get("/profile/:username",protectRoute,getUserProfile)
router.get("/suggested",protectRoute,getSuggestedUsers)
router.post("/follow/:id",protectRoute,followUnfollowUser)
router.post("/update",protectRoute,updateUser) */

module.exports = router;