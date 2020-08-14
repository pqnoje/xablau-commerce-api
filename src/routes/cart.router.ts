import { Router, Request, Response, NextFunction } from 'express'
import { CartProvider } from '../providers/cart.provider'

class CartRouter {
  public router: Router

  constructor() {
    this.router = Router()
    this.init()
  }

  private async getAll(req: Request, res: Response, next: NextFunction) {
    try{
      let carts = await CartProvider.getAll()
      res.send(carts)
    }catch(error){
      res.sendStatus(404)
    }
  }

  private async create(req: Request, res: Response, next: NextFunction) {
    let params = req.body

    try {
      await CartProvider.create(params)
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
      await CartProvider.update(id, params)
      res.sendStatus(200)
    }catch(error){
      res.sendStatus(400)
    }
  }

  private async delete(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id

    try {
      await CartProvider.delete(id)
      res.sendStatus(200)
    }catch(error){
      res.sendStatus(400)
    }
  }

  private async find(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id

    try{
      let product = await CartProvider.find(id)
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

const cartRouter = new CartRouter()

export default cartRouter.router