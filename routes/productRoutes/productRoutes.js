const middleWare=require('../../middleware/middleWare')
const productController=require("../../controlles/productControl/productControl")
async function productRoutes(fastify,option) {
    fastify.post("/addForm",{preHandler:middleWare},productController.formData)
    fastify.get("/getData/:username",{preHandler:middleWare},productController.getAlldatas)
    fastify.get("/checkForm",{preHandler:middleWare},productController.formCheck)
    fastify.post("/addSkillsIcons",{preHandler:middleWare},productController.skillsIconsAdd)
    fastify.post("/update/allChanged/data",{preHandler:middleWare},productController.updateAllChange)
    fastify.post("/upload/images",{preHandler:middleWare},productController.uploadImage)
    fastify.get("/getImage",{preHandler:middleWare},productController.GetImageUrl)
    fastify.post("/setGenerate",{preHandler:middleWare},productController.SetGenerate)
    fastify.post("/editStyles",{preHandler:middleWare},productController.skillStyles)
    fastify.get("/getSkills",{preHandler:middleWare},productController.getSkillsStyles)
    fastify.post("/set/sectionstyles",{preHandler:middleWare},productController.addSectionStyles)
}

module.exports=productRoutes