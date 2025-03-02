const mongoose=require("mongoose")

const formDataModel=new mongoose.Schema({
    email:{type:String},
    name:{type:String},
    proffesion:{type:String},
    username:{type:String},
    contacts: { 
        github: { type: String },
        linkedIn: { type: String },
        contactNumber: { type: String }
    },
    aboutMe:[
        {
            aboutHead:{type:String},
            aboutDescription:{type:String}
        }
    ],
    education:[
        {
            std:{type:String},
            mark:{type:String},
           description:{type:String}
        }
    ],
    skills:[
        {
            name:{type:String},
            icon:{type:String}
        }
    ],
    projects:[
        {
            projectName:{type:String},
            projectLink:{type:String},
            projectDetails:{type:String}
        }
    ],
    generate:{
        type:Boolean,default:false
    }
})

const formDataScehma=mongoose.model("formDataScehma",formDataModel)

module.exports=formDataScehma