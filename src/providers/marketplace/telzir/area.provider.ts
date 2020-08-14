import { Area } from '../../../entity/marketplace/telzir/area.entity'

export class AreaProvider {

  public static getAll() {
    return Area.find({})
  }

  public static async create(params) {
    try {
      const area = new Area(params)
      console.log('area created')
      await area.save()
    } catch (error) {
      throw error
    }
  } 

  public static async update(id: string, params) {
    try{
      let area = await Area.findById(id)

      Object.assign(area, params)

      await area.save()
    }catch(error){
      console.error(error)
      throw error
    }
  }

  public static async delete(id: string) {
    try {
      let area = await Area.findById(id)
      await area.delete()
    }catch(error){
      console.error(error)
      throw error
    }
  }

  public static async find(id: string) {
    try {
      let area = await Area.findById(id)
      return area
    } catch (error) {
      throw error
    }
  }
}