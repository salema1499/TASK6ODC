const userModel = require("../../db/model/user.model")
const myHelper = require("../../app/helper")
const jwt=require("jsonwebtoken")

const auth=async(req,res,next)=>{
    try{
   //console.log("middleware")
   const token=req.header("Authorization").replace("Bearer ","")
   const decodeed=jwt.verify(token,process.env.tokenPass)
   // to cheak find in db or no
   console.log(decodeed)
   const userData=await userModel.findOne({
              _id:decodeed._id,
              "tokens.token":token

   })
  
   req.user = userData
   req.token = token
   next()
    }
    catch(e){
        myHelper.resHandler(res, 500, false, e.message, "unauthorized")
    }
}



module.exports={auth}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2E0OWU1ZmQ3MjRmZDYxZTgwMTdkYmYiLCJpYXQiOjE2NzE3MzI4NTB9.miAwSOF27jT2GwioR0CBtOg8z8perxeR6LV4wXvfhGc