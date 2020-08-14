import { Checkout } from '../entity/transactions/checkout.entity'

export class CheckoutProvider {

  public static getAll() {
    return Checkout.find({})
  }

  public static async create(params) {
    try {
      const checkout = new Checkout(params)
      await checkout.save()
    } catch (error) {
      throw error
    }
  } 

  public static async update(id: string, params) {
    try{
      let checkout = await Checkout.findById(id)

      Object.assign(checkout, params)
  
      await checkout.save()
    }catch(error){
      throw error
    }
  }

  public static async delete(id: string) {
    try {
      let checkout = await Checkout.findById(id)
      await checkout.delete()
    }catch(error){
      console.error(error)
      throw error
    }
  }

  public static async find(id: string) {
    try {
      let checkout = await Checkout.findById(id)
      return checkout
    } catch (error) {
      throw error
    }
  }
}