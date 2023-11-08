const express=require("express");
const router=express.Router();
const  {
    signup,
    signin
  } = require("../controllers/auth");
const {getallPost,
      updatePostHistory,
      creatPost,
      deletPost,
      updatePost,
       getuserPost,
      getProfile,
    updateProfile,
  creatProfile} =require("../controllers/index")
const verifyToken = require('../middleware/authJWT')


router.route("/login").post(signin)
router.route("/register").post(signup)
router.route("/allposts/:Id").get(verifyToken,getallPost)
router.route("/user/userposts/:Id").get(verifyToken,getuserPost)
router.route("/user/userprofile/:Id").get(verifyToken,getProfile)
router.route("/user/userprofile").put(verifyToken,updateProfile).post(verifyToken,creatProfile)
router.route("/post").post(verifyToken,creatPost)
router.route("/post/:statusId").put(verifyToken,updatePostHistory)
router.route("/post/:postId").put(verifyToken,updatePost).delete(verifyToken,deletPost)



module.exports=router;