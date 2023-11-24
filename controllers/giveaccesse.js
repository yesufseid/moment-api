const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const asyncWarapper=require("../middleware/async")

const giveaccesse=asyncWarapper( async(req,res)=>{
    const{userId,postId}=req.body
    if (!req.user) {
      res.status(403)
        .send({
          message: "Invalid JWT token"
        });
    }
    const accesse= await prisma.accesse.create({
     data:{
        userId:userId,
        authorId:postId
     }
    })



    if(!accesse){
      const error={
        message:`file not found in this ${id} id`,
        status:404
      }
      res.status(404).json({msg:error})
    }
    res.status(200).json({accesse})
  });
  
  const giveaccesseProfile=asyncWarapper( async(req,res)=>{
    const id=req.params.Id
    if (!req.user) {
      res.status(403)
        .send({
          message: "Invalid JWT token"
        });
    }
    const post= await prisma.post.findFirst({
    where:{
       id:id
    },
    select:{
      activitiy:{
        select:{
          userId:true
        }
      }
    },
    })
    if(!post){
      const error={
        message:`file not found in this ${id} id`,
        status:404
      }
      res.status(404).json({msg:error})
    }
    const user=post.activitiy.map((c)=>{
      return  c.userId  
  })
  const m=await prisma.profile.findFirst({
    where:{
        authorId:user[0]
   },
   select:{
    user:true
   }
})


    const profile=m.user
    res.status(200).json({profile})
  });


  const giveDDProfile=asyncWarapper( async(req,res)=>{
    const id=req.params.Id
    if (!req.user) {
      res.status(403)
        .send({
          message: "Invalid JWT token"
        });
    }
    const m=await prisma.profile.findFirst({
      where:{
          authorId:id
     },
     select:{
      user:true
     }
  })
    if(!m){
      const error={
        message:`file not found in this ${id} id`,
        status:404
      }
      res.status(404).json({msg:error})
    }
    const profile=m.user
    res.status(200).json({profile})
  });












  module.exports={giveaccesse,giveaccesseProfile,giveDDProfile}