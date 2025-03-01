const mongoose=require("mongoose")

const imageModel=new mongoose.Schema({
    imageUrl:{type:String},
    email:{type:String}
})

const ImageSchema=mongoose.model("ImageSchema",imageModel)

module.exports=ImageSchema