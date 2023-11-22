const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const asyncWarapper=require("../middleware/async")

const getallPost=asyncWarapper( async(req,res)=>{
    const{userId}=req.query
    const location=parseFloat(req.query.location)
    if (!req.user) {
      res.status(403)
        .send({
          message: "Invalid JWT token"
        });
    }
    const AllPosts = await prisma.post.findMany({
        where:{
            location:{
              lte:location,
            },
        },
        orderBy: [
          {
            location:'asc',
          },
        ],
  
      include: {
        author: true,
    }
    })

const activitiy = await prisma.activitiy.findMany({
        where:{
          userId:userId
        },
        select:{
          authorId:true
        }
      })


    if(!AllPosts && !activitiy){
      const error={
        message:`file not found in this ${id} id`,
        status:404
      }
      res.status(404).json({msg:error})
    }

    const x=activitiy.map((c)=>c.authorId)
    const post=AllPosts.filter((p)=>!x.includes(p.id))
    
    res.status(200).json({post})
  });
  
  module.exports={getallPost}