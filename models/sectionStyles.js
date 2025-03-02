const mongoose=require('mongoose')
const sectionModel=new mongoose.Schema({
    SectionName:{type:String},
    headindColor:{type:String},
    textColor:{type:String},
    bgColor:{type:String},
    subBgColor:{type:String},
    email:{type:String}

})

const sectionStylesSchema=mongoose.model("sectionStylesSchema",sectionModel)
module.exports=sectionStylesSchema