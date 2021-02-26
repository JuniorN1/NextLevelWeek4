import { Request, Response } from "express";
import { getCustomRepository, IsNull, Not } from "typeorm";
import { SurveysUserRepository } from "../repositories/SurveysUserRepository";

class NpsController{
    
    async execute(request:Request,response:Response){
        const {survey_id} = request.params;
        const surveysUserRepository = getCustomRepository(SurveysUserRepository);

        const surveysUser = await surveysUserRepository.find(
            {
                survey_id,
                value:Not(IsNull())
            }
        );

        const detractor = surveysUser.filter(survey=>
            (survey.value>=0 && survey.value<=6)
        );        
        const promotors = surveysUser.filter(survey=>
            (survey.value>=9 && survey.value<=10)
        );
        const passive = surveysUser.filter(survey=>
            (survey.value>=7 && survey.value<=8)
        );
        const totalAnswers = surveysUser.length;
        const calculate =( (promotors.length-detractor.length)/totalAnswers)*100;
        return response.json({
            detractor:detractor.length,
            promotors:promotors.length,
            passive:passive.length,
            totalAnswers,
            nps:calculate


        })

    }

}

export { NpsController };

