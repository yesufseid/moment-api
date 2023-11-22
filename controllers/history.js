const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const asyncWarapper=require("../middleware/async")

const updatePostHistory=asyncWarapper( async(req,res,next)=>{
    const id=req.params.statusId
    const post = await prisma.post.update({
      where: {
        id: id,
      },
      data: { 
        status:"done"
       },
    })
     if (!post){
        const error={
          message:`file not found in this  ${Taskid} id`,
          status:404
        }
        res.status(404).json({msg:error})
     }
     res.status(200).json(post)
});


/////
const deletPost=asyncWarapper( async(req,res,next)=>{
    if (!req.user) {
      res.status(403)
        .send({
          message: "Invalid JWT token"
        });
    }
    const id=req.params.postId
    const post = await prisma.post.delete({
      where: { id:id },
    })
    if(!post){
      const error={
        message:`file not found in this ${Taskid} id`,
        status:404
      }
      res.status(404).json({msg:error})
    }
    res.status(200).json(post)
  
  });
  /////
  const getuserPost=asyncWarapper( async(req,res)=>{
    const id=req.params.Id
    if (!req.user) {
      res.status(403)
        .send({
          message: "Invalid JWT token"
        });
    }
    const userPosts= await prisma.user.findFirst({
      where:{
        id:id
      },
      include: {
        post:{
          orderBy:{
            id:"desc"
           },
           include:{
            activitiy:true
           }
        }
      },
     
    })
    // const AllPosts = await prisma.activitiy.findMany({
    //   where:{
    //     userId:id
    //   },
    //   include:{
    //     author:true
    //   }
    // }
    // )


    // const activitiy = await prisma.activitiy.findMany({
    //     where:{
    //       userId:id
    //     },
    //     select:{
    //       authorId:true
    //     }
    //   })

    if(!userPosts){
      const error={
        message:`file not found in this ${id} id`,
        status:404
      }
      res.status(404).json({msg:error})
    }
      
  //   const x=activitiy.map((c)=>c.authorId)
  //   const p=AllPosts.filter((p)=>x.includes(p.id))
  //  const post=p.concat(userPosts.post)

    res.status(200).json({userPosts})
  });




  module.exports={getuserPost}