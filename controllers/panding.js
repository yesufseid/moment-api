const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const asyncWarapper=require("../middleware/async")





const getPanding=asyncWarapper( async(req,res)=>{
    const id=req.params.Id
    if (!req.user) {
      res.status(403)
        .send({
          message: "Invalid JWT token"
        });
    }
    const activitiy= await prisma.activitiy.findMany({
      where:{
        userId:id
      },
      include:{
        author:{
          include:{
            author:true,
            accesse:true
          }
        }
      }
  })
    if(!activitiy){
      const error={
        message:`file not found in this ${id} id`,
        status:404
      }
      res.status(404).json({msg:error})
    }
      
  //   const x=activ.map((c)=>c.author)
  //   const p=x.filter((p)=>p.authorId===id)
  //    const c=activitiy.map((p)=>p.author)
  //  const post=c.concat(p)

    res.status(200).json({activitiy})
  });




  module.exports={getPanding}