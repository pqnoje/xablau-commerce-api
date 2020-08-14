import { Delivery } from '../entity/transactions/delivery.entity'

export class DeliveryProvider {

  public static getAll() {
    return Delivery.find({})
  }

  public static async create(params) {
    try {
      const delivery = new Delivery(params)
      await delivery.save()
    } catch (error) {
      throw error
    }
  } 

  public static async update(id: string, params) {
    try{
      let delivery = await Delivery.findById(id)

      Object.assign(delivery, params)
  
      await delivery.save()
    }catch(error){
      throw error
    }
  }

  public static async delete(id: string) {
    try {
      let delivery = await Delivery.findById(id)
      await delivery.delete()
    }catch(error){
      console.error(error)
      throw error
    }
  }

  public static async find(id: string) {
    try {
      let delivery = await Delivery.findById(id)
      return delivery
    } catch (error) {
      throw error
    }
  }
}