import { User } from '../entity/auth/user.entity'
//import * as bcrypt from 'bcrypt'

export class UserProvider {

  public static getAll() {
    return User.find({})
  }

  public static async create(params) {
    try {
      const user = new User(params)
      await user.save()
    } catch (error) {
      throw error
    }
  }

  public static async update(id: string, params) {
    let user = await User.findById(id)

    Object.assign(user, params)

    await user.save()
  }

  public static async delete(id: string) {
    return await User.findByIdAndDelete(id)
  }

  public static async find(id: string) {
    try {
      let user = await User.findById(id)
      return user
    } catch (error) {
      throw error
    }
  }

  public static async authenticate(username: string, password: string) {
    let user = await User.findOne({ username })

    return new Promise((resolve, reject) => {
      password === user.password ? resolve() : reject(`username: ${username} has entered wrong password`)
      
      /*bcrypt.compare(password, user.password, (error, isMatch) => {
        if (error) throw error
        if (isMatch)
          resolve()
        reject(`username: ${username} has entered wrong password`)
      })*/
    })
  }
}