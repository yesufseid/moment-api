const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const asyncWarapper=require("../middleware/async")



//prisma.post
const getallPost=asyncWarapper( async(req,res)=>{
  const location=parseFloat(req.query.location)
  if (!req.user) {
    res.status(403)
      .send({
        message: "Invalid JWT token"
      });
  }
  const AllPosts = await prisma.post.findMany({
    where:{
    //   status:{
    //     not:"done"
    //   },
      location:{
        lte:location,
      },
    },
    orderBy: [
      {
        location:'asc',
      },
    ],
  })
  if(!AllPosts){
    const error={
      message:`file not found in this ${id} id`,
      status:404
    }
    res.status(404).json({msg:error})
  }
    
  console.log("1");
  res.status(200).json({AllPosts})
});

const creatPost=asyncWarapper( async(req,res,next)=>{
  if (!req.user) {
    res.status(403)
      .send({
        message: "Invalid JWT token"
      });
  }
  
  const {location,quate,authorId}=req.body
  const post=await prisma.post.create({
    data:{
      location:location,
      quate:quate,
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
  res.status(200).json(post)   
});

const updatePost=asyncWarapper( async(req,res,next)=>{
  const id=req.params.postId
  if (!req.user) {
    res.status(403)
      .send({
        message: "Invalid JWT token"
      });
  }
 
  const post = await prisma.post.update({
    where: { id: id },
    data: { 
      status:"panding"
     },
  })
  if(!post){
    const error={
      message:`file not found in this ${id} id`,
      status:404
    }
    res.status(404).json({msg:error})
  }
  res.status(200).json(post)
})
const updatePostHistory=asyncWarapper( async(req,res,next)=>{
    const id=req.params.statusId
    console.log(id);
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

//prisma.user

//login route
const getuserPost=asyncWarapper( async(req,res)=>{
  const id=req.params.Id
  if (!req.user) {
    res.status(403)
      .send({
        message: "Invalid JWT token"
      });
  }
  const AllPosts = await prisma.user.findFirst({
    where:{
      id:id
    },
    include: {
      posts: true,
    },
    orderBy: [
      {
        id:'desc',
      },
    ],
  })
  if(!AllPosts){
    const error={
      message:`file not found in this ${id} id`,
      status:404
    }
    res.status(404).json({msg:error})
  }
    
  console.log("1");
  res.status(200).json({AllPosts})
});

//prisma.profile
const creatProfile=asyncWarapper( async(req,res,next)=>{
  if (!req.user) {
    res.status(403)
      .send({
        message: "Invalid JWT token"
      });
  }
  const {profile,id}=req.body
  const post=await prisma.profile.create({
    data:{
      authorId: id,
      profile:profile
    }
  })
  if(!post){
    const error={
      message:`file not found in this ${id} id`,
      status:404
    }
    res.status(404).json({msg:error})
  }
  res.status(200).json(post)   
});
const updateProfile=asyncWarapper( async(req,res,next)=>{
  const {profile,id}=req.body.profile
  const post = await prisma.post.update({
    where: {
      authorId: id,
    },
    data: { 
      profile:profile
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
const getProfile=asyncWarapper( async(req,res,next)=>{
  const id=req.params.Id
  const post = await prisma.post.findUnique({
    where: {
      authorId: id,
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

module.exports={getallPost,
                 updatePostHistory,
                 deletPost,
                 updatePost,
                 creatPost,
                 getuserPost,
                 getProfile,
                 updateProfile,
                 creatProfile
}