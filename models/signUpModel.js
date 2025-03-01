const mongoose=require("mongoose")
const userSignUp=new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    createdAt:{type:Date}
})

const userSignUpSchema=mongoose.model('userSignUpSchema',userSignUp)
module.exports=userSignUpSchema