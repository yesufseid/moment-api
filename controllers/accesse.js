const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const asyncWarapper=require("../middleware/async")





const getAccesse=asyncWarapper( async(req,res)=>{
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
      include:{
        activitiy:{
           select:{
            userId:true
           } 
        }
      }
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
    const m=await prisma.user.findFirst({
             where:{
                 id:user[0]
            },
         })
   if(user.length===2){
    let m1=await prisma.user.findFirst({
        where:{
            id:user[1]
       },
    })
   }
if(user.length===3){
    let m2=await prisma.user.findFirst({
        where:{
            id:user[2]
       },
    })
}
 const users=[]
 users.push(m)
  res.status(200).json({users})
    
  });




  module.exports={getAccesse}