import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import { SurveysUserRepository } from "../repositories/SurveysUserRepository";
class AnswerController{
    
    async execute(request:Request,response:Response){
        const {value} = request.params;
        const {u}   =request.query;

 
        const surveysUserRepository = getCustomRepository(SurveysUserRepository);
        const surveysUser = await surveysUserRepository.findOne(
            {
                id:String(u),
                value:null

            }
        );
        if(!surveysUser){          
            return response.status(400).json({
                error : "Survey User des not exists or has already been evaluated!"
            })
        }
        surveysUser.value= Number(value);

        await surveysUserRepository.save(surveysUser);
        return response.status(201).json(surveysUser)

    }
}

export {AnswerController}