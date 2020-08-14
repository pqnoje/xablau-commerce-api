import { Person } from '../entity/auth/person.entity'
import { User } from '../entity/auth/user.entity'

export class PersonProvider {

  public static getAll() {
    return Person.find({})
  }

  public static async create(params) {
    try {
      const person = new Person(params)
      person.user = params.user._id
      await person.save()
    } catch (error) {
      throw error
    }
  } 

  public static async update(id: string, params) {
    try{
      let person = await Person.findById(id)

      Object.assign(person, params)
  
      await person.save()
    }catch(error){
      throw error
    }
  }

  public static async delete(id: string) {
    try{
      let person = await Person.findById(id)
      await User.findByIdAndDelete(person.user._id)
      person.delete()
    }catch(error){
      throw error
    }
  }

  public static async find(id: string) {
    try {
      let person = await Person.findById(id)
      return person
    } catch (error) {
      throw error
    }
  }
}