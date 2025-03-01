const { signUpControl, loginControl, googleLogin } = require("../../controlles/authControl/authControl");

async function authRoutes(fastify,option) {
    fastify.post("/signup",signUpControl)
    fastify.post("/signin",loginControl)
    fastify.post("/google",googleLogin)
}

module.exports=authRoutes