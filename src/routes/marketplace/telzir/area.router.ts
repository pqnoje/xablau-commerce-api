import { Router, Request, Response, NextFunction } from 'express'
import { AreaProvider } from '../../../providers/marketplace/telzir/area.provider'

class AreaRouter {
  public router: Router

  constructor() {
    this.router = Router()
    this.init()
  }

  private async getAll(req: Request, res: Response, next: NextFunction) {
    try{
      let areas = await AreaProvider.getAll()
      res.send(areas)
    }catch(error){
      res.sendStatus(404)
    }
  }

  private async create(req: Request, res: Response, next: NextFunction) {
    let params = req.body

    try {
      await AreaProvider.create(params)
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
      await AreaProvider.update(id, params)
      res.sendStatus(200)
    }catch(error){
      res.sendStatus(400)
    }
  }

  private async delete(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id

    try {
      await AreaProvider.delete(id)
      res.sendStatus(200)
    }catch(error){
      res.sendStatus(400)
    }
  }

  private async find(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id

    try{
      let area = await AreaProvider.find(id)
      res.send(area)
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

const areaRouter = new AreaRouter()

export default areaRouter.router