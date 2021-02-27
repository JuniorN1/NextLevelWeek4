import { Request, Response } from "express";
import { resolve } from 'path';
import { getCustomRepository } from "typeorm";
import * as yup from 'yup';
import { AppError } from "../errors/AppError";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUserRepository } from "../repositories/SurveysUserRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailService from "../services/SendMailService";
class SendMailController{
    async execute(request:Request,response:Response){
        const {email,survey_id} = request.body;
        const schema = yup.object().shape({
            email:yup.string().email().required(),
            survey_id:yup.string().required(),
        });      
        try{
            await schema.validate(request.body,{abortEarly:false});
        }catch(err){
            throw new AppError(err); 
           
        }
        const surveysRepository =getCustomRepository(SurveysRepository);
        const userRepository = getCustomRepository(UsersRepository);
        const surveysUserRepository =getCustomRepository(SurveysUserRepository);

        const userAlreadyExists = await userRepository.findOne({
            email,
        });
        if(!userAlreadyExists){
            throw new AppError("User does not Exist");    
           
        }
     
        const surveyAlreadyExists = await surveysRepository.findOne({id:survey_id});
        if(!surveyAlreadyExists){
            throw new AppError("Survey does not Exist!"); 
           
        }
 
        const surveyUserAlreadyExist = await surveysUserRepository.findOne({
            where:{user_id:userAlreadyExists.id,value:null},
            relations:["user","survey"]
        });
      
        const variabel ={
            name:userAlreadyExists.name,
            title:surveyAlreadyExists.title,
            description:surveyAlreadyExists.description,
            id:"",
            link:process.env.URL_MAIL

            
        }
      
        const npsPath =  resolve(__dirname,"..","views","emails","npsMail.hbs");
        if(surveyUserAlreadyExist){
            variabel.id=surveyUserAlreadyExist.id
            await SendMailService.execute(email,surveyAlreadyExists.title,variabel,npsPath);
            return response.json(surveyUserAlreadyExist);
        }
        const SurveyUser = surveysUserRepository.create(
            {
                user_id:userAlreadyExists.id,
                survey_id
           
            }
        )
        variabel.id=SurveyUser.id;
        await surveysUserRepository.save(SurveyUser);
        await SendMailService.execute(email,surveyAlreadyExists.title,variabel,npsPath);
        return response.status(201).json({
            info:SurveyUser
        })
    }
    

}

export { SendMailController };

