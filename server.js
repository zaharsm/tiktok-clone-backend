import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import Data from "./data.js";
import Videos from "./dbModel.js";

//app config
const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','*');
    next();
})


// DB config
const password = process.env.PASSWORD;
const connection_url = "mongodb+srv://admin-1:"+password+"@cluster0.79cyate.mongodb.net/tiktokDB";

mongoose.connect(connection_url, {useUnifiedTopology: true});


// api endpoints
app.get("/",(req,res) => res.status(200).send("hello world"));

app.get("/v1/posts", (req,res) => res.status(200).send(Data));

app.get("/v2/posts",(req,res) => {
     Videos.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
     })
})

app.post("/v2/posts", (req,res) => {
    
    const dbVideos = req.body;

     Videos.create(dbVideos,(err,data) =>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
})

//listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));


