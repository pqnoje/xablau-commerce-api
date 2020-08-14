import { Router, Request, Response, NextFunction } from 'express'
import { ShelfProvider } from '../providers/shelf.provider'

class ShelfRouter {
  public router: Router

  constructor() {
    this.router = Router()
    this.init()
  }

  private async getAll(req: Request, res: Response, next: NextFunction) {
    let params = req.query
    try {
      let shelfs = await ShelfProvider.getAll(params)
      res.send(shelfs)
    } catch (error) {
      console.error(error)
      res.sendStatus(404)
    }
  }

  private async create(req: Request, res: Response, next: NextFunction) {
    let params = req.body

    try {
      await ShelfProvider.create(params)
      res.sendStatus(200)
    } catch (error) {
      console.error(error)
      res.sendStatus(400)
    }
  }

  private async update(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id
    let params = req.body

    try {
      await ShelfProvider.update(id, params)
      res.sendStatus(200)
    } catch (error) {
      res.sendStatus(400)
    }
  }

  private async delete(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id

    try {
      await ShelfProvider.delete(id)
      res.sendStatus(200)
    } catch (error) {
      res.sendStatus(400)
    }
  }

  private async find(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id

    try {
      let product = await ShelfProvider.find(id)
      res.send(product)
    } catch (error) {
      res.sendStatus(404)
    }
  }

  private async categories(req: Request, res: Response, next: NextFunction) {
    let categories = ShelfProvider.categories()
    res.send(categories)
  }

  init() {
    this.router.get('/', this.getAll)
    this.router.post('/', this.create)
    this.router.put('/:id', this.update)
    this.router.delete('/:id', this.delete)
    this.router.get('/:id', this.find)
    this.router.get('/categories', this.categories)
  }
}

const productRouter = new ShelfRouter()

export default productRouter.router