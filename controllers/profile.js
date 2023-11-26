const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const asyncWarapper=require("../middleware/async")

const createProfileImg=asyncWarapper( async(req,res)=>{
    const{uthorId,img}=req.body
    console.log("hellow");
    if (!req.user) {
      res.status(403)
        .send({
          message: "Invalid JWT token"
        });
    }
    const profile = await prisma.images.create({
     data:{
        authorId:uthorId,
        img:img
     }
    })
    if(!profile){
      const error={
        message:`file not found in this ${id} id`,
        status:404
      }
      res.status(404).json({msg:error})
    }
     console.log(profile);
    res.status(200).json({profile})
  });



  const getProfileImg=asyncWarapper( async(req,res)=>{
    const id=req.params.id
    console.log(id);
    if (!req.user) {
      res.status(403)
        .send({
          message: "Invalid JWT token"
        });
    }
    const profile = await prisma.images.findMany({
     where:{
        authorId:id
     },
     take:-1
    })
    if(!profile){
      const error={
        message:`file not found in this ${id} id`,
        status:404
      }
      res.status(404).json({msg:error})
    }
  console.log(profile);
    res.status(200).json({profile})
  });



  module.exports={createProfileImg,getProfileImg}