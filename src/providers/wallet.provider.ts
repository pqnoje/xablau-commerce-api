import { Wallet } from '../entity/containers/wallet.entity'

export class WalletProvider {

  public static getAll() {
    return Wallet.find({})
  }

  public static async create(params) {
    try {
      const wallet = new Wallet(params)
      await wallet.save()
    } catch (error) {
      throw error
    }
  } 

  public static async update(id: string, params) {
    try{
      let wallet = await Wallet.findById(id)

      Object.assign(wallet, params)
  
      await wallet.save()
    }catch(error){
      throw error
    }
  }

  public static async delete(id: string) {
    try {
      let wallet = await Wallet.findById(id)
      await wallet.delete()
    }catch(error){
      console.error(error)
      throw error
    }
  }

  public static async find(id: string) {
    try {
      let wallet = await Wallet.findById(id)
      return wallet
    } catch (error) {
      throw error
    }
  }
}