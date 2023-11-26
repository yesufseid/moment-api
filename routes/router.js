const express=require("express");
const router=express.Router();
const  {
    signup,
    signin
  } = require("../controllers/auth");
const {
      updatePostHistory,
      creatPost,
      deletPost,
      updatePost,
      getProfile,
    updateProfile,
  creatProfile} =require("../controllers/index")
const verifyToken = require('../middleware/authJWT')
const {activitiy}=require("../controllers/other")
const {getallPost}=require('../controllers/allposts')
const {getuserPost}=require('../controllers/history')
const {getPanding}=require('../controllers/panding')
const {getAccesse}=require('../controllers/accesse')
const {giveaccesse,giveaccesseProfile,giveDDProfile}=require('../controllers/giveaccesse')
const {createProfileImg,getProfileImg}=require('../controllers/profile')



router.route("/login").post(signin)
router.route("/register").post(signup)
router.route("/allposts/:Id").get(verifyToken,getallPost)
router.route("/giveaccesse").post(verifyToken,giveaccesse)
router.route("/giveaccesseProfile/:Id").get(verifyToken,giveaccesseProfile)
router.route("/giveDDprofile/:Id").get(verifyToken,giveDDProfile)
router.route("/user/userposts/:Id").get(verifyToken,getuserPost)
router.route("/user/userposts/panding/:Id").get(verifyToken,getPanding)
router.route("/user/userposts/accesse/:Id").get(verifyToken,getAccesse)
router.route("/user/userprofile/:Id").get(verifyToken,getProfile)
router.route("/user/createprofileImg").post(verifyToken,createProfileImg)
router.route("/user/getprofileImg/:id").get(verifyToken,getProfileImg)
router.route("/user/userprofile").put(verifyToken,updateProfile).post(verifyToken,creatProfile)
router.route("/post").post(verifyToken,creatPost)
router.route("/post/:statusId").put(verifyToken,updatePostHistory)
router.route("/post/:postId").put(verifyToken,updatePost).delete(verifyToken,deletPost)
router.route("/post/activitiy").post(verifyToken,activitiy)




module.exports=router;