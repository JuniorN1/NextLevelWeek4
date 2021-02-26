import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyUser } from "../model/SurveyUser";
import { SurveysUserRepository } from "../repositories/SurveysUserRepository";
class AnswerController{
    
    async execute(request:Request,response:Response){
        const {value} = request.params;
        const {u}   =request.query;

      
        const surveysUserRepository = getCustomRepository(SurveysUserRepository);
        const surveyUser = await surveysUserRepository.findOne(
            {
                id:String(u),

            }
        );
        if(!surveyUser){
            return response.status(400).json({
                error : "Survey User des not exists!"
            })
        }
        surveyUser.value= Number(value);

        await surveysUserRepository.save(SurveyUser);
        return response.status(201).json(surveyUser)

    }
}

export {AnswerController}