import { Router, Request, Response, NextFunction } from 'express'
import { PromotionProvider } from '../../../providers/marketplace/telzir/promotion.provider'

class PromotionRouter {
  public router: Router

  constructor() {
    this.router = Router()
    this.init()
  }

  private async getAll(req: Request, res: Response, next: NextFunction) {
    try{
      let promotions = await PromotionProvider.getAll()
      res.send(promotions)
    }catch(error){
      res.sendStatus(404)
    }
  }

  private async create(req: Request, res: Response, next: NextFunction) {
    let params = req.body

    try {
      await PromotionProvider.create(params)
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
      await PromotionProvider.update(id, params)
      res.sendStatus(200)
    }catch(error){
      res.sendStatus(400)
    }
  }

  private async delete(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id

    try {
      await PromotionProvider.delete(id)
      res.sendStatus(200)
    }catch(error){
      res.sendStatus(400)
    }
  }

  private async find(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id

    try{
      let promotion = await PromotionProvider.find(id)
      res.send(promotion)
    }catch(error){
      res.sendStatus(404)
    }
  }

  private async calc(req: Request, res: Response, next: NextFunction) {
    let params = req.body

    try{
      let calc = await PromotionProvider.calc(params)
      res.send(calc)
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
    this.router.post('/calc', this.calc)
  }
}

const promotionRouter = new PromotionRouter()

export default promotionRouter.router