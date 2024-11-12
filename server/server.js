 
const express=require('express')
const mongoose=require('mongoose')
const dotenv = require('dotenv');
const cors=require("cors");
const path=require("path")

 
dotenv.config();
const app=express()

mongoose.connect(process.env.MONGO_URI)
        .then(()=>console.log("mongodb connected"))
        .catch((err)=>console.log("error while connecting",err))

app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST","PUT","DELETE"]
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PostRoute=require("./route/PostRoute")


app.use('/api/v1/postapp',PostRoute)
const port=5000
app.listen(port)