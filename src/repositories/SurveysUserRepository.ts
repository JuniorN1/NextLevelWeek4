import { EntityRepository, Repository } from "typeorm";

import { SurveyUser } from "../model/SurveyUser";
@EntityRepository(SurveyUser)
class SurveysUserRepository extends Repository<SurveyUser> {
    
}


export {SurveysUserRepository};