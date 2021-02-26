import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysUserRepository } from "../repositories/SurveysUserRepository";

class NpsController{
    
    async execute(request:Request,response:Response){
        const {survey_id} = request.params;
        const surveysUserRepository = getCustomRepository(SurveysUserRepository);

        const surveysUser = await surveysUserRepository.find(
            {
                survey_id
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
        const calculate = (promotors.length-detractor.length)/totalAnswers;
        return response.json({
            detractor,
            promotors,
            passive,
            totalAnswers,
            nps:calculate


        })

    }

}

export { NpsController };

