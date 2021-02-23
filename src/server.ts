import 'reflect-metadata';
import express, { request } from 'express';
import './database';
const app = express();

app.get("/",(request,response)=>{
    return response.json({message:"Hello World - NLW04"});
});
app.post("/",(request,response)=>{
    return  response.json({message:"Sucess in save data!"})
});

app.listen(3333,()=>console.log("Server is running!"));


