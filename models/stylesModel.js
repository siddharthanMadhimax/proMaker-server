const mongoose=require("mongoose")

const stylesSchema=new mongoose.Schema({
    bgColor:{type:String,default:"black"},
    textColor:{type:String,default:"white"},
    borderColor:{type:String,default:"black"},
    email:{type:String}
})

const skillsStyels=mongoose.model("skillsStyles",stylesSchema)
module.exports=skillsStyels