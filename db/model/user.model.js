const mongoose=require("mongoose")
const validator=require("validator")
//const { boolean } = require("webidl-conversions")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
const userSchema=mongoose.Schema({
    fName:{
        type:String,
        trim:true,
        lowercase:true,
        minLength:5,
        maxLength:20,
        required:true
    },
    lName:{
        type:String,
        trim:true,
        lowercase:true,
        minLength:5,
        maxLength:20,
        required:true 
    },
    age:{
        type:Number,
        min:21,
        max:50,
        default:21//requred
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
        minLength:5,
        maxLength:20,
        required:true,
        unique:true,
        //attrebutes in mongoose
        validate (value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email format")
            }
        }
    },
    status:{
        type:Boolean,
        default :false
    },
    image:{
        type:String,
        trim:true
    },
    password:{
       type:String,
       trim:true,
       required:true, 


    },
    gender :{
        type:String,
        trim:true,
        lowercase:true,
        enum:["male","fmale"]
    },
    dOfBirth:{
        type:Date
    },
    phoneNum:{
        type:String,
        validate(value){
            if(!validator.isMobilePhone(value,"ar-EG"))
               throw new Error("invalid phone number")
        }
    },
    addresess:[//id alone
        {
        addressType:{
            type:String,
            trim:true,
            required:true
        },
        addresess:{}
    }
    ],
    tokens:[//id alone//اررى عشان هيدخل من اكتر من ديفايس
        {
            token:{type:String,required:true}
        }
    ]
},{timestamps:true})//بتوضح امتى اخر تحديث او اى انشاا


//تشفر الباسورد قبل عمليه الحفظ pre...//pre is a function in mongodb
userSchema.pre("save",async function(){
   //Modified => لو باسورد جديد او باسورد موجود ف كلا الحالتين هيشفره
   if(this.isModified('password')){
   this.password=await bcryptjs.hash(this.password,8)
   }
   //hash(المراد تشفيره,,,sult=>loop على عدد الاتيريشن)
//console.log(this.password)
})



//to cheak on email and password for login
 userSchema.statics.loginUser=async (email,password)=>{
    const userData =await User.findOne({email})
    if(!userData) throw new Error("invalid emalil ya salemaa")
    //compare => بتقارن الباسورد اللى اتكتب ب الباسورد اللى متخزن ف الداتا بيز
    const validatepassword=await bcryptjs.compare(password,userData.password)
    if(!validatepassword) throw new Error("invalid password ya salemaa")
     return userData
}
//لحذف العناصر الغير مهمه...هيتحذف فقط من الاوت بوط ولكن موجودين فى الداتا بيز عادى  function 
userSchema.methods.toJSON=function(){
    const data =this.toObject()
    delete data.__v
    delete data.password
    //delete data.tokens
//يجب كتابه ريترن عشان يظهر باقى الداتا 
    return data
}

userSchema.methods.generateToken=async function(){
  const userData=this
  console.log("test ", process.env.tokenPass)
  const token=jwt.sign({_id:userData._id},process.env.tokenPass)
  userData.tokens=userData.tokens.concat({token})
  await userData.save()
  return token

}

const User = mongoose.model("User", userSchema)
module.exports=User