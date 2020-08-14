import { Router, Request, Response, NextFunction } from 'express'
import { PersonProvider } from '../providers/person.provider'

class PersonRouter {
  public router: Router

  constructor() {
    this.router = Router()
    this.init()
  }

  private async getAll(req: Request, res: Response, next: NextFunction) {
    try{
      let people = await PersonProvider.getAll()
      res.send(people)
    }catch(error){
      res.sendStatus(404)
    }
  }

  private async create(req: Request, res: Response, next: NextFunction) {
    let params = req.body

    try {
      await PersonProvider.create(params)
      res.sendStatus(200)
    } catch(error) {
      res.sendStatus(400)
    }
  }

  private async update(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id
    let params = req.body

    try{
      await PersonProvider.update(id, params)
      res.sendStatus(200)
    }catch(error){
      res.sendStatus(400)
    }
  }

  private async delete(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id

    try {
      await PersonProvider.delete(id)
      res.sendStatus(200)
    }catch(error){
      res.sendStatus(401)
    }
  }

  private async find(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id

    try{
      let user = await PersonProvider.find(id)
      res.send(user)
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

const personRoutes = new PersonRouter()

export default personRoutes.router