const { message } = require("antd")
const userSignUpSchema = require("../../models/signUpModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {OAuth2Client}=require("google-auth-library")

const _exports={}



_exports.signUpControl=async(request,reply)=>{
    try{
        const {name,email,password}=request.body
        const existingUser=await userSignUpSchema.findOne({email})
        if(!name || !email || !password){
            return reply.send({message:"please fill all deatils",success:false})
        }
        if(existingUser){
            return reply.send({message:"user already exists",success:false})
        }
        const userUsed=await userSignUpSchema.findOne({name})
        if(userUsed){
            return reply.send({message:"user name is already present",success:false})
        }
        if(password.length<8){
            return reply.send({message:"password is weak please enter more than 8 character" ,success:"passweek"})
        }

        const salt=await bcrypt.genSalt(10)
        const hashedPass=await bcrypt.hash(password,salt)
        const newUser=new userSignUpSchema({
            name,
            email,
            password:hashedPass,
            createdAt:new Date()
        })
        await newUser.save()
        const token=jwt.sign({
            userId:newUser._id,
            email:email,
            name:name
        },"siddhu",{expiresIn:"5h"})
        return reply.status(200).send({message:"success",success:true,isEnter:true,token:token})

    }catch(err){
        console.log(err)
    }
}

_exports.loginControl=async(request,reply)=>{
    try{
        const {email,password}=request.body
        const user=await userSignUpSchema.findOne({email})
        if(!user){
            return reply.send({message:"user not found",success:false})
        }
        const passMatch=await bcrypt.compare(password,user.password)
        if(!passMatch){
            return reply.send({message:"password not match",success:false})
        }
        const token=jwt.sign({
            userId:user._id,email:email,name:user.name
        },"siddhu",{expiresIn:"5h"})
        console.log("token",token)
        return reply.send({message:"success",isEnter:true,success:true,token:token,name:user.name,})
    }catch(err){
        console.log(err)
    }
}

_exports.googleLogin=async(request,reply)=>{
    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
   const client=new OAuth2Client()
    try{
        const {token}=request.body
        if(!token){
            return reply.send({message:"token is required",success:false})
        }
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID,
        });

        const { name, email, picture } = ticket.getPayload();
        let user = await userSignUpSchema.findOne({ email });
        if (!user) {
            user = new userSignUpSchema({
                name,
                email,
                password: "", 
                createdAt: new Date(),
            });
            await user.save();
        }
        const authToken = jwt.sign({ userId: user._id, email: user.email, name: user.name }, "siddhu", {
            expiresIn: "10h",
        });
        return reply.status(200).send({
            message: "Login successful",
            success: true,
            token: authToken,
            name: user.name,
            email: user.email,
        });
    }catch(err){
        console.log(err)
    }
}

module.exports=_exports