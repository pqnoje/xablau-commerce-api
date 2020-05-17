import { getConnection, getRepository, getMongoManager } from "typeorm";
import {} from "typeorm";
import { User } from "../entity/auth/user.entity"
import { Person } from "../entity/auth/person.entity";
import { Address } from "../entity/auth/addess.entity";

export class UserProvider {

    public static getUsers(): Promise<Array<User>> {
        return getRepository(User).find()
    }

    public static async create(params){
        let user = Object.assign(new User(), params)

        return await getRepository(User).save(user)
    }

    public static async update(id: string, params){
        let user =  await getRepository(User).findOne(id)
    
        Object.assign(user, params)

        return await getRepository(User).update(id, user)
    }

    public static async delete(id: string){
        return await getRepository(User).delete(id)
    }

    public static async find(id: string){
        return await getRepository(User).findOne(id)
    }
}