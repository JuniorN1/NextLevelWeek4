import 'reflect-metadata';
import express, { NextFunction,Request,Response } from 'express';
import createConnection from './database';
import { router } from './router';
import { AppError } from './errors/AppError';
createConnection();
const app = express();
app.use(express.json())
app.use(router);
app.use((err:Error,request:Request,response:Response,_next:NextFunction)=>{
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            message:err.message});
    } 

})
export{app} 