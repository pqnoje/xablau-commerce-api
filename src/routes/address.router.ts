import { Router, Request, Response, NextFunction } from 'express'
import { AddressProvider } from '../providers/address.provider'

class AddressRouter {
  public router: Router

  constructor() {
    this.router = Router()
    this.init()
  }

  private async getAll(req: Request, res: Response, next: NextFunction) {
    try{
      let addresses = await AddressProvider.getAll()
      res.send(addresses)
    }catch(error){
      res.sendStatus(404)
    }
  }

  private async create(req: Request, res: Response, next: NextFunction) {
    let params = req.body

    try {
      await AddressProvider.create(params)
      res.sendStatus(200)
    } catch(error) {
      console.error(error)
      res.sendStatus(400)
    }
  }

  private async update(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id
    let params = req.body

    try{
      await AddressProvider.update(id, params)
      res.sendStatus(200)
    }catch(error){
      res.sendStatus(400)
    }
  }

  private async delete(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id

    try {
      await AddressProvider.delete(id)
      res.sendStatus(200)
    }catch(error){
      res.sendStatus(400)
    }
  }

  private async find(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id

    try{
      let address = await AddressProvider.find(id)
      res.send(address)
    }catch(error){
      res.sendStatus(404)
    }
  }
  init() {
    this.router.get('/', this.getAll)
    this.router.post('/', this.create)
    this.router.put('/:id', this.update)
    this.router.delete('/:id', this.delete)
    this.router.get('/:id', this.find)
  }
}

const addressRoutes = new AddressRouter()

export default addressRoutes.router