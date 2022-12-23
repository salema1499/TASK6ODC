const router = require("express").Router()
const User = require('../app/controller/user.controller')
const {auth}=require("../app/middleware/auth.middleware")
router.post("/register",User.register)
router.post("/login",User.login)
router.get("/",auth ,User.allUsers)
router.post("/me",auth ,User.profile)
router.post("/deleteall",auth,User.deleteAll)
router.post("/deleteme/:id",auth,User.deleteme)
router.patch("/editme/:id",auth,User.editme)
router.post("/logout",auth,User.logOut)
router.post("/logoutAll",auth,User.logoutAll)
router.get("/single/:id",auth,User.getSingle)
router.post("/addAddr", auth, User.addAddr)

module.exports=router

