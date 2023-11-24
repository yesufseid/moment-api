const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const asyncWarapper=require("../middleware/async")


const activitiy=asyncWarapper( async(req,res)=>{
    const {userId,authorId}=req.body
    if (!req.user) {
      res.status(403)
        .send({
          message: "Invalid JWT token"
        });
    }
    const post = await prisma.activitiy.create({
      data:{
        userId:userId,
        authorId:authorId
      }
    })
    if(!post){
      const error={
        message:`file not found in this ${id} id`,
        status:404
      }
      res.status(404).json({msg:error})
    }
    res.status(200).json({post})
  });

  ///////
  









  module.exports={activitiy}