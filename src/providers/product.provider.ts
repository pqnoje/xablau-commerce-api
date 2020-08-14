import { Product } from '../entity/valuables/product.entity'
import { ShelfProvider } from './shelf.provider'
import * as fs from 'fs'

export class ProductProvider {

  public static getAll() {
    return Product.find({})
  }

  public static async create(params) {
    const contents = fs.readFileSync(params.image.image.path, {encoding: 'base64'})
    params.image = `data:image/png;base64,${contents}`

    try {
      const product = new Product(params)
      await product.save()
    } catch (error) {
      throw error
    }
  } 

  public static async update(id: string, params) {
    try{
      let product = await Product.findById(id)

      Object.assign(product, params)

      await product.save()
    }catch(error){
      console.error(error)
      throw error
    }
  }

  public static async delete(id: string) {
    try {
      let product = await Product.findById(id)
      await product.delete()
    }catch(error){
      console.error(error)
      throw error
    }
  }

  public static async find(id: string) {
    try {
      let product = await Product.findById(id)
      return product
    } catch (error) {
      throw error
    }
  }
}