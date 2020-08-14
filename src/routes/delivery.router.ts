import { Router, Request, Response, NextFunction } from 'express'
import { CheckoutProvider } from '../providers/checkout.provider'

class DeliveryRouter {
  public router: Router

  constructor() {
    this.router = Router()
    this.init()
  }

  private async getAll(req: Request, res: Response, next: NextFunction) {
    try{
      let deliveries = await CheckoutProvider.getAll()
      res.send(deliveries)
    }catch(error){
      res.sendStatus(404)
    }
  }

  private async create(req: Request, res: Response, next: NextFunction) {
    let params = req.body

    try {
      await CheckoutProvider.create(params)
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
      await CheckoutProvider.update(id, params)
      res.sendStatus(200)
    }catch(error){
      res.sendStatus(400)
    }
  }

  private async delete(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id

    try {
      await CheckoutProvider.delete(id)
      res.sendStatus(200)
    }catch(error){
      res.sendStatus(400)
    }
  }

  private async find(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id

    try{
      let product = await CheckoutProvider.find(id)
      res.send(product)
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

const deliveryRouter = new DeliveryRouter()

export default deliveryRouter.router