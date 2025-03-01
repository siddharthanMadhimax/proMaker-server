const jwt=require("jsonwebtoken")
async function verifyUser(request,reply) {
    try{
        const token=request.headers["authorization"]?.split(' ')[1];
        if(!token){
            return reply.send({message:"token is required"})
        }
        const decode=jwt.verify(token,"siddhu")
        console.log("decode",decode)
        request.user=decode
    }catch(err){
        console.log(err)
    }
}

module.exports=verifyUser