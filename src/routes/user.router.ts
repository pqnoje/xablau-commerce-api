import { Router, Request, Response, NextFunction } from 'express'
import { UserProvider } from '../providers/user.provider'
import { MongoCodeErrors } from '../constants/status-codes.enum'

class UserRouter {
  public router: Router

  constructor() {
    this.router = Router()
    this.init()
  }

  private async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      let users = await UserProvider.getAll()
      res.send(users)
    } catch (error) {
      res.sendStatus(404)
    }
  }

  private async create(req: Request, res: Response, next: NextFunction) {
    let params = req.body

    try {
      await UserProvider.create(params)
      res.sendStatus(200)
    } catch (error) {
      console.log(error)
      if (error.code === MongoCodeErrors.ALREADY_EXISTS) res.sendStatus(401)
      else res.sendStatus(202)
    }
  }

  private async update(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id
    let params = req.body

    try {
      await UserProvider.update(id, params)
      res.sendStatus(200)
    } catch (error) {
      res.status(401).send(error)
    }
  }

  private async delete(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id

    try {
      await UserProvider.delete(id)
      res.sendStatus(200)
    } catch (error) {
      res.sendStatus(400)
    }
  }

  private async find(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id

    try {
      let user = await UserProvider.find(id)
      res.send(user)
    } catch (error) {
      res.sendStatus(400)
    }
  }

  private async authenticate(req: Request, res: Response, next: NextFunction) {
    let params = req.body

    try {
      await UserProvider.authenticate(params.username, params.password)
      res.send(true).status(200)
    } catch (error) {
      res.send(false).status(401)
    }
  }

  init() {
    this.router.get('/', this.getAll)
    this.router.post('/', this.create)
    this.router.put('/:id', this.update)
    this.router.delete('/:id', this.delete)
    this.router.get('/:id', this.find)
    this.router.post('/auth', this.authenticate)
  }
}

const characterRoutes = new UserRouter()

export default characterRoutes.router