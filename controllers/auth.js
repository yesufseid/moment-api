var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const asyncWarapper=require("../middleware/async")

const signin=asyncWarapper( async(req,res,next)=>{
    const {email,password}=req.body
  const user=await prisma.user.findUnique({
    where: {
      email:email,
    },
  })
  if (!user){
    const error={
      message:`file not found in this  ${Taskid} id`,
      status:404
    }
    res.status(404).json({msg:error})
  }

  var passwordIsValid = bcrypt.compareSync(
    req.body.password,
    user.password
  );

  if (!passwordIsValid) {
    return res.status(401)
      .send({
        accessToken: null,
        message: "Invalid Password!"
      });
  }
  var token = jwt.sign({
    id: user.id
  }, process.env.API_SECRET, {
    expiresIn:60*60*24*30
  });
  res.status(200)
  .json({
    user: {
      id: user.id,
      email: user.email,
    },
    message: "Login successfull",
    accessToken: token,
  });
  })









  const signup=asyncWarapper( async(req,res,next)=>{
    const user=await prisma.user.create({
      data:{
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password, 8)
      }
    })
    if (!user){
      const error={
        message:`file not found in this  ${Taskid} id`,
        status:404
      }
      
      res.status(404).json({msg:error})
    }
    res.status(200).json(user)   
  });
  













  module.exports= {signin,signup}


