const fastify = require("fastify")({ logger: true });
const app = fastify;
const connectDb = require("./database/connectDb");
const cors = require("@fastify/cors");
const authRoutes = require("./routes/authRoutes/authRoutes");
const dotenv=require("dotenv");
const multipart = require("@fastify/multipart");
const productRoutes = require("./routes/productRoutes/productRoutes");
const cloudinary=require("cloudinary")
dotenv.config()

// const fastifyPassport = require("fastify-passport");
// const fastifySecureSession = require("fastify-secure-session");

// app.register(multipart)          
app.register(multipart);

app.get("/", async (request, reply) => {
    try {
        await reply.send("hello");
    } catch (err) {
        console.log(err);
    }
});

app.register(authRoutes, { prefix: "/auth" });
app.register(productRoutes,{prefix:"/product"})

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.register(cors, {
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
});

const start = async () => {
    try {
        await app.listen({ port: 3000 });
        console.log("Server is running on http://localhost:3000");
    } catch (err) {
        console.log(err);
    }
};

connectDb();

start();
