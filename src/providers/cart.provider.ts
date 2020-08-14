import { Cart } from '../entity/containers/cart.entity'

export class CartProvider {

  public static getAll() {
    return Cart.find({})
  }

  public static async create(params) {
    try {
      const cart = new Cart(params)
      await cart.save()
    } catch (error) {
      throw error
    }
  } 

  public static async update(id: string, params) {
    try{
      let cart = await Cart.findById(id)

      Object.assign(cart, params)
  
      await cart.save()
    }catch(error){
      throw error
    }
  }

  public static async delete(id: string) {
    try {
      let cart = await Cart.findById(id)
      await cart.delete()
    }catch(error){
      console.error(error)
      throw error
    }
  }

  public static async find(id: string) {
    try {
      let cart = await Cart.findById(id)
      return cart
    } catch (error) {
      throw error
    }
  }
}