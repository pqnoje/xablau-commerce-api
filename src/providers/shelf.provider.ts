import { Shelf } from '../entity/containers/shelf.entity'
import { ShelfCategories } from '../constants/shelf-categories.enum'
import { Product } from '../entity/valuables/product.entity'

export class ShelfProvider {

  public static async getAll(params) {
    try{
      return await Shelf.find(params)
    }catch(error){
      throw error
    }
  }

  public static async create(params) {
    try {
      const shelf = new Shelf(params)
      await shelf.save()
    } catch (error) {
      throw error
    }
  } 

  public static async update(id: string, params) {
    try{
      let shelf = await Shelf.findById(id)

      Object.assign(shelf, params)
  
      await shelf.save()
    }catch(error){
      throw error
    }
  }

  public static async delete(id: string) {
    try {
      let shelf = await Shelf.findById(id)
      await shelf.delete()
    }catch(error){
      console.error(error)
      throw error
    }
  }

  public static async find(id: string) {
    try {
      let shelf = await Shelf.findById(id)
      return shelf
    } catch (error) {
      throw error
    }
  }

  public static async categories() {
    return ShelfCategories
  }
}