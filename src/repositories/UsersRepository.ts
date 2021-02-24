import { EntityRepository, Repository } from "typeorm";
import { User } from "../model/user";
@EntityRepository(User)
class UsersRepository extends Repository<User> {
    
}


export {UsersRepository};