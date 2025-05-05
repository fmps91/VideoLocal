const { protectRoute } = require("../middleware/protectRoute");
const { uploadVideo,filterVideos,findVideo,findVideos } = require("../controllers/videoController")
const router = require("express").Router();

router.post('/upload/:username',uploadVideo)
router.post('/filter',filterVideos)
router.get('/read/:id',findVideo)
router.get('/list/:id',findVideos)
/* router.get("/profile/:username",protectRoute,getUserProfile)
router.get("/suggested",protectRoute,getSuggestedUsers)
router.post("/follow/:id",protectRoute,followUnfollowUser)
router.post("/update",protectRoute,updateUser) */

module.exports = router;