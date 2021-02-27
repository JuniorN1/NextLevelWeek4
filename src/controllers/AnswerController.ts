import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import * as yup from 'yup';
import { AppError } from "../errors/AppError";
import { SurveysUserRepository } from "../repositories/SurveysUserRepository";
class AnswerController{
    
    async execute(request:Request,response:Response){
        const {value} = request.params;
        const {u}   =request.query;
        const schema = yup.object().shape({
            value:yup.string().required(),
        });
        const schema1 = yup.object().shape({
            u:yup.string().required(),
        });      
        try{
            await schema.validate(request.params,{abortEarly:false});
            await schema1.validate(request.query,{abortEarly:false});
        }catch(err){
            throw new AppError(err); 
        }
 
        const surveysUserRepository = getCustomRepository(SurveysUserRepository);
        const surveysUser = await surveysUserRepository.findOne(
            {
                id:String(u),
                value:null

            }
        );
        if(!surveysUser){     
            throw new AppError("Survey User des not exists or has already been evaluated!");    
        }
        surveysUser.value= Number(value);

        await surveysUserRepository.save(surveysUser);
        return response.status(201).json(surveysUser)

    }
}

export { AnswerController };
