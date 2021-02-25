import { Request, Response } from "express";
import { resolve } from 'path';
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUserRepository } from "../repositories/SurveysUserRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailService from "../services/SendMailService";
class SendMailController{
    async execulte(request:Request,response:Response){
        const {email,survey_id} = request.body;
     
        const surveysRepository =getCustomRepository(SurveysRepository);
        const userRepository = getCustomRepository(UsersRepository);
        const surveysUserRepository =getCustomRepository(SurveysUserRepository);

        const userAlreadyExists = await userRepository.findOne({
            email,
        });
        if(!userAlreadyExists){
            return response.status(400).json({
                error:"User does not Exist"
            })
        }
        const surveyAltradyExists = await surveysRepository.findOne({id:survey_id});
        if(!surveyAltradyExists){
            return response.status(400).json({
                error:"Survey does not Exist"
            })
        }
        const npsPath =  resolve(__dirname,"..","views","emails","npsMail.hbs");
        const SurveyUser = surveysUserRepository.create(
            {
                user_id:userAlreadyExists.id,
                survey_id
           
            }
        )
        const variabel ={
            name:userAlreadyExists.name,
            title:surveyAltradyExists.title,
            description:surveyAltradyExists.description,
            user_id:userAlreadyExists.id,
            link:process.env.URL_MAIL


        }
        await surveysUserRepository.save(SurveyUser);
        await SendMailService.execute(email,surveyAltradyExists.title,variabel,npsPath);
        return response.status(201).json({
            info:SurveyUser
        })
    }
    

}

export { SendMailController };
