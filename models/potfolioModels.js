const mongoose=require("mongoose")

const portfolioModel=new mongoose.Schema({
    email:{type:String},
    heroImg:{type:String},
    projects:[
        {
            projectImage:{type:String}
        }
    ],
    skills:[
        {
            skillImage:{type:String}
        }
    ]
})

const portfolioSchema=mongoose.model("portfolioSchema",portfolioModel)
module.exports=portfolioSchema