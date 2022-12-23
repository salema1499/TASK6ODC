const express=require("express")
const app=express()

require("../db/connect")
 app.use(express.json())

const userRout=require("../routes/user.routes")
const postRout=require("../routes/post.routes")

app.use("/api/user/",userRout)
app.use("/api/post/",postRout)

app.all("*",(req,res)=>{
    res.status(404).send({
        apiStatus:false,
        message:"invalid URL",
        data : {}
    })
})

module.exports=app