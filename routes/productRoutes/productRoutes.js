const middleWare=require('../../middleware/middleWare')
const productController=require("../../controlles/productControl/productControl")
async function productRoutes(fastify,option) {
    fastify.post("/addForm",{preHandler:middleWare},productController.formData)
    fastify.get("/getData",{preHandler:middleWare},productController.getAlldatas)
    fastify.get("/checkForm",{preHandler:middleWare},productController.formCheck)
    fastify.post("/addSkillsIcons",{preHandler:middleWare},productController.skillsIconsAdd)
    fastify.post("/update/allChanged/data",{preHandler:middleWare},productController.updateAllChange)
    fastify.post("/upload/images",{preHandler:middleWare},productController.uploadImage)
    fastify.get("/getImage",{preHandler:middleWare},productController.GetImageUrl)
}

module.exports=productRoutes