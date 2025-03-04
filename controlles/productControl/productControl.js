const formDataScehma = require("../../models/formDataModel")
const cloudinary=require('cloudinary').v2
const streamifier = require("streamifier");
const ImageSchema = require("../../models/ImageModel")
const skillsStyels = require("../../models/stylesModel");
const { message } = require("antd");
const sectionStylesSchema = require("../../models/sectionStyles");
const _exports={}

_exports.formData=async(request,reply)=>{
    const {email}=request.user
    const {name}=request.user
    try{
        const values=request.body
        console.log(values)
        const {skills,education}=values
        const SkillsToAdd=skills.split(",").map(skill=>skill.trim())
      const skillsData=SkillsToAdd.map(skill=>({name:skill}))
        console.log(SkillsToAdd)
        values.username=name
        values.email=email
        values.skills=skillsData
        
        const AllData=await formDataScehma.create(values)
        return reply.status(200).send({message:"suucess",success:true})
    }catch(err){
        console.log(err)
    }
}


_exports.getAlldatas=async(request,reply)=>{
    
    const {username}=request.params
    console.log("user name da",username)
    
    try{
        const alldata=await formDataScehma.find({username})
        return reply.send({data:alldata})
    }catch(err){
        console.log(err)
    }
}

_exports.formCheck=async(request,reply)=>{
    console.log("user",request.user)
    const {email}=request.user
    try{
        
        const findForm=await formDataScehma.findOne({email})
        if(findForm){
            console.log("find form",findForm)
            return reply.status(200).send({message:"success",success:true})
        }
        else{
            return reply.send({message:"failure",success:false})
        }
    }catch(err){
        console.log(err)
    }
}


_exports.uploadImage = async (request, reply) => {
    const {email}=request.user
    try {
        console.log("Received request to upload image");

        if (!request.isMultipart()) {
            return reply.status(400).send({ message: "Invalid content type" });
        }

        const data = await request.file();
        if (!data) {
            return reply.status(400).send({ message: "No file uploaded" });
        }

        console.log("Uploading to Cloudinary...");
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({ folder: "portfolios" }, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            });
            data.file.pipe(stream);
        });

        console.log("Cloudinary response:", result);

        const newImage = await ImageSchema.create({ imageUrl: result.secure_url,email:email }); // Save image URL in MongoDB

        reply.send({ imageUrl: newImage.imageUrl, success: true });

    } catch (err) {
        console.error("Upload error:", err);
        return reply.status(500).send({ message: "Upload failed", error: err.message });
    }
};



_exports.skillsIconsAdd = async (request, reply) => {
    const { email } = request.user;
    try {
        const skillData = request.body;
        console.log('skillicon', skillData);

        for (const [name,icon] of Object.entries(skillData) ){
            await formDataScehma.updateOne(
                {email,"skills.name":name},
                {
                    $set:{"skills.$.icon":icon}
                }
            )
        }
        return reply.status(200).send({ message: "Success", success: true });
    } catch (err) {
        console.log("error", err);
        return reply.status(500).send({ message: "Internal Server Error", success: false });
    }
};


_exports.updateAllChange=async(request,reply)=>{
    const {email}=request.user
    try{
        if(!email){
            return reply.send({message:"user id not found",success:false})
        }

        const updatedValues=request.body
        console.log("values are ",updatedValues)
        
        if(updatedValues.length==0){
            return reply.send({message:"no values to update",success:false})
        }

        const updateTheValues = await formDataScehma.findOneAndUpdate(
            { email },
            { $set: updatedValues },
            { new: true }
        );
        
        console.log("updated values",updateTheValues)
        return reply.status(200).send({message:"success",success:true})
    }catch(err){
        console.log(err)
    }
}

_exports.GetImageUrl=async(request,reply)=>{
    const {email}=request.user
    try{
        const imageUrl=await ImageSchema.findOne({email})
        console.log("email image",email)
        if(!imageUrl){
            return reply.send({success:false})
        }
        return reply.status(200).send({imageUrl:imageUrl,success:true})
    }catch(err){
        console.log("error",err)
    }
}

_exports.SetGenerate=async(request,reply)=>{
    const {email}=request.user
    try{
        const setGerenateTrue=await formDataScehma.findOneAndUpdate({email},
            {
                $set:{
                    generate:true
                }
            }
        )
        return reply.status(200).send({message:"success",success:true})
    }catch(err){
        console.log(err)
    }
}


_exports.skillStyles = async (request, reply) => {
    try {
        const { email } = request.user;
        const { styles } = request.body;

        console.log("Incoming styles:", styles);
        styles.email = email;

        const finduser = await skillsStyels.findOne({ email });

        if (!finduser) {
            await skillsStyels.create(styles);
            return reply.status(200).send({ message: "success", success: false });
        } else {
            const update = await skillsStyels.findOneAndUpdate(
                { email },
                {
                    $set: {
                        bgColor: styles.bgColor,
                        textColor: styles.textColor,
                        borderColor: styles.borderColor
                    }
                },
                { new: true } // Return the updated document
            );

            console.log("Updated Document:", update);
            return reply.status(200).send({ message: "success", success: true });
        }
    } catch (err) {
        console.log("Error:", err);
        return reply.status(500).send({ message: "Server Error", success: false });
    }
};


_exports.getSkillsStyles=async(request,reply)=>{
    try{
        const {email}=request.user
        if(!email){
            return reply.send({message:"please login again"})
        }
        const styles=await skillsStyels.findOne({email})
        // console.log("styles skill",styles)
        return reply.status(200).send({message:"success",success:true,data:styles})
    }catch(err){
        console.log(err)
    }
}
_exports.addSectionStyles = async (request, reply) => {
    const { email } = request.user;

    try {
        const { styles } = request.body;
        styles.email = email;  // Ensure email is included
        console.log("section styles", styles);

        const { SectionName } = styles; // Extract SectionName from styles

        const checkExistingData = await sectionStylesSchema.findOne({ email, SectionName });

        if (!checkExistingData) {
            await sectionStylesSchema.create(styles);
            return reply.status(200).send({ message: "Created Successfully", success: true });
        } else {
            await sectionStylesSchema.findOneAndUpdate(
                { email, SectionName },
                { $set: styles },  // Directly updating using the styles object
                { new: true }      // Returns the updated document
            );
            return reply.status(200).send({ message: "Updated Successfully", success: true });
        }
    } catch (err) {
        console.error(err);
        return reply.status(500).send({ message: "Server error", success: false });
    }
};


module.exports=_exports