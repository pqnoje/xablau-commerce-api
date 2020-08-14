import { Promotion } from '../../../entity/marketplace/telzir/promotion.entity'
import { NationalFeeProvider } from './national-fee.provider'

const PROMOTION_TAX = 1.1
const FREE_BY_PROMOTION = 0

export class PromotionProvider {

  public static getAll() {
    return Promotion.find({})
  }

  public static async create(params) {
    try {
      const promotion = new Promotion(params)
      await promotion.save()
    } catch (error) {
      throw error
    }
  } 

  public static async update(id: string, params) {
    try{
      let promotion = await Promotion.findById(id)

      Object.assign(promotion, params)

      await promotion.save()
    }catch(error){
      console.error(error)
      throw error
    }
  }

  public static async delete(id: string) {
    try {
      let promotion = await Promotion.findById(id)
      await promotion.delete()
    }catch(error){
      console.error(error)
      throw error
    }
  }

  public static async find(id: string) {
    try {
      let promotion = await Promotion.findById(id)
      return promotion
    } catch (error) {
      throw error
    }
  }

  public static async calc(params) {
    try {
      let nationalFee = await NationalFeeProvider.findByOriginDist(params.originArea.code, params.distArea.code)
      let promotionValue: number, normalValue: number
      
      if(nationalFee){
        let finalDuration = params.promotion.amount - params.duration
        promotionValue = finalDuration < 0 ? (finalDuration * -1) * nationalFee.value * PROMOTION_TAX : FREE_BY_PROMOTION
        normalValue = nationalFee.value * params.duration
      }
      
      let result = {
        ...params,
        promotionValue,
        normalValue
      }
      return result
    } catch (error) {
      throw error
    }
  } 
}