
const myHelper=require("../../app/helper")
const userModel=require("../../db/model/user.model")

class User {
   static register=async(req,res)=>{
    try{
        if(req.body.password.length<6) throw new Error("password must be more than 6")
        const userData=new userModel(req.body)
        await userData.save()
        myHelper.resHandler(res,200,true,userData,"user add successfully")
    }
    catch(e){
        myHelper.resHandler(res,500,false,e,e.messagge)
    }
   }


   static login = async(req,res) => {
    try{
        const userData = await userModel.loginUser(req.body.email, req.body.password)
        const token = await userData.generateToken()
        myHelper.resHandler(res, 200, true, {user:userData, token}, "user added successfully")
    }
    catch(e){
        myHelper.resHandler(res, 500, false, e, e.message)
    }


   
}

static allUsers=async(req,res)=>{


   try{

    const users=await userModel.find()
   
    myHelper.resHandler(res, 200, true, users, "all users feteched")
    }
    catch(e){
        myHelper.resHandler(res, 500, false, e, e.message)
    }
}

static profile=(req,res)=>{// to show user
    myHelper.resHandler(res, 200, true, {user:req.user}, "my profile")
   
}


static deleteAll=async(req,res)=>{// to delete all users

    const userData=await userModel.deleteMany()
    myHelper.resHandler(res, 200, userData, " all users deleted")
   
}

static deleteme=async(req,res)=>{// to delete this user

    try{
        const user = await userModel.deleteOne({user:req.params.id})
        myHelper.resHandler(res, 200, true,user,"this user is deleted")
    }
    catch(e){
        myHelper.resHandler(res, 500, false, e, e.message)
    }
}

static editme=async(req,res)=>{
    try{
      let userData=req.user
        // userData:req.user.filter(
        //     t =>t._id === parseInt(req.params.id) 
        // )
        console.log(req.body)
         const user = await userModel.findOneAndUpdate({id:req.params.id},req.body)
        //  console.log(userData)
       // await user.save()
        //console.log(req.user)
        console.log(req.body)
        myHelper.resHandler(res, 200, true,user,"this user is edited ")
    }
    catch(e){
        myHelper.resHandler(res, 500, false, e, e.message)
    }



}

static logOut=async(req,res)=>{
    try{ 
        //delete token ===logout
        //i have req.user and tokens
          req.user.tokens=req.user.tokens.filter(
              t =>t.token != req.token
          )
         await req.user.save()
           myHelper.resHandler(res, 200, true,null,"logOut ")
    }
    catch(e){
        myHelper.resHandler(res, 500, false, e, e.message)
    }



}


static logoutAll=async(req,res)=>{
    try{ 
        //delete all tokens ===logout
        //i have req.user and tokens
          req.user.tokens=[]
             
         await req.user.save()
           myHelper.resHandler(res, 200, true,null,"logOut ")
    }
    catch(e){
        myHelper.resHandler(res, 500, false, e, e.message)
    }



}

static getSingle=async(req,res)=>{
    try{ 
        //show any user not admain
          const user=await userModel.findById(req.params.id)
             
         
           myHelper.resHandler(res, 200, true,user,"logOut ")
    }
    catch(e){
        myHelper.resHandler(res, 500, false, e, e.message)
    }



}
static addAddr = async(req,res)=>{
    try{
        if(!req.user.addresses) req.user.addresses=[]
        req.user.addresses.push(req.body)
        await req.user.save()
        myHelper.resHandler(res, 200, true, req.user, "updated")

    }
    catch(e){
        myHelper.resHandler(res, 500, false, e, e.message)
    }
}




}

module.exports=User