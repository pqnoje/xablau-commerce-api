import { Address } from '../entity/auth/address.entity'

export class AddressProvider {

  public static getAll() {
    return Address.find({})
  }

  public static async create(params) {
    try {
      const address = new Address(params)
      await address.save()
    } catch (error) {
      throw error
    }
  } 

  public static async update(id: string, params) {
    try{
      let address = await Address.findById(id)

      Object.assign(address, params)
  
      await address.save()
    }catch(error){
      throw error
    }
  }

  public static async delete(id: string) {
    try {
      let address = await Address.findById(id)
      await address.delete()
    }catch(error){
      console.error(error)
      throw error
    }
  }

  public static async find(id: string) {
    try {
      let address = await Address.findById(id)
      return address
    } catch (error) {
      throw error
    }
  }
}