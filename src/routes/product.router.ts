import { Router, Request, Response, NextFunction } from 'express'
import { ProductProvider } from '../providers/product.provider'
import * as formidable from 'formidable'

class ProductRouter {
  public router: Router

  constructor() {
    this.router = Router()
    this.init()
  }

  private async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      let products = await ProductProvider.getAll()
      res.send(products)
    } catch (error) {
      res.sendStatus(404)
    }
  }

  private async create(req: Request, res: Response, next: NextFunction) {
    const form = formidable({ multiples: true });

    try {
      let params
      await form.parse(req, (err, fields, image) => {
        if (err) {
          next(err)
          return
        }
  
        params = {
          ...JSON.parse(fields.data),
          image
        }
        
        ProductProvider.create(params)
        res.sendStatus(200)
      })
    }catch(err) {
      res.sendStatus(400)
    }
    
  }

  private async update(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id
    let params = req.body

    try {
      await ProductProvider.update(id, params)
      res.sendStatus(200)
    } catch (error) {
      res.sendStatus(400)
    }
  }

  private async delete(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id

    try {
      await ProductProvider.delete(id)
      res.sendStatus(200)
    } catch (error) {
      res.sendStatus(400)
    }
  }

  private async find(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id

    try {
      let product = await ProductProvider.find(id)
      res.send(product)
    } catch (error) {
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

const productRouter = new ProductRouter()

export default productRouter.router