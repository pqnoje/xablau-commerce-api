import { NationalFee } from '../../../entity/marketplace/telzir/national-fee.entity'

export class NationalFeeProvider {

  public static getAll() {
    return NationalFee.find({})
  }

  public static findByOriginDist(origin: number, dist: number) {
    return NationalFee.findOne({origin, dist})
  } 

  public static async create(params) {
    try {
      const nationalFee = new NationalFee(params)
      await nationalFee.save()
    } catch (error) {
      throw error
    }
  } 

  public static async update(id: string, params) {
    try{
      let nationalFee = await NationalFee.findById(id)

      Object.assign(nationalFee, params)

      await nationalFee.save()
    }catch(error){
      console.error(error)
      throw error
    }
  }

  public static async delete(id: string) {
    try {
      let nationalFee = await NationalFee.findById(id)
      await nationalFee.delete()
    }catch(error){
      console.error(error)
      throw error
    }
  }

  public static async find(id: string) {
    try {
      let nationalFee = await NationalFee.findById(id)
      return nationalFee
    } catch (error) {
      throw error
    }
  }
}