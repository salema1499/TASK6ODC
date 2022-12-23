const mongoose = require("mongoose")
const Post = mongoose.model("Post", {
    postType:{
        type:String,
        enum:["txt", "file"],
        required:true,
        trim:true,
        lowercase:true
    },
    content:{
        type:String,
        required: function(){
            return this.postType=="txt"//هيشاور فى حاله انه من نوع text...//arrow finction لا تنفع عشان وجود ال this
        }
    },
    file:{
        type:String,
        required: function(){
            return this.postType!="txt"
        }
    }
})
module.exports=Post