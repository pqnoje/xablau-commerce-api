import { Router, Request, Response, NextFunction } from 'express'
import { UserProvider } from '../providers/user.provider'
import * as _ from 'lodash'
import { MongoCodeErrors } from '../constants/status-codes.enum'

class UserRouter {
  public router: Router

  constructor() {
    this.router = Router()
    this.init()
  }

  private getAll(req: Request, res: Response, next: NextFunction) {
    UserProvider.getUsers().then(
      users => res.send(users),
      error => {
        if(!_.isEmpty(error)){
          if(error.code === MongoCodeErrors.ALREADY_EXISTS) res.sendStatus(401)
        } else{
          res.sendStatus(202)
        }
      })
  }

  private create(req: Request, res: Response, next: NextFunction) {
    let params = req.body
    UserProvider.create(params).then(
      result => res.send(result),
      error => {
        if(!_.isEmpty(error)){
          if(error.code === MongoCodeErrors.ALREADY_EXISTS) res.sendStatus(401)
        } else{
          res.sendStatus(202)
        }
      })
  }

  private update(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id
    let params = req.body

    if(!_.isEmpty(params.username)){
      res.sendStatus(401)
    }else{
      UserProvider.update(id, params).then(
        result => res.send(JSON.stringify(result)),
        error => {
          if(!_.isEmpty(error)){
              res.sendStatus(400)
          } else{
            res.sendStatus(202)
          }
        })
    }
  }

  private delete(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id
    UserProvider.delete(id).then(
      result => res.send(result),
      error => {
        if(!_.isEmpty(error)){
          if(error.code === MongoCodeErrors.ALREADY_EXISTS) res.sendStatus(401)
        } else{
          res.sendStatus(202)
        }
      })
  }

  private find(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id
    UserProvider.find(id).then(
      user => res.send(user),
      error => {
        if(_.isEmpty(error)) res.sendStatus(202)
        if(error.code) res.sendStatus(error.code)
      })
  }

  init() {
    this.router.get('/', this.getAll)
    this.router.post('/', this.create)
    this.router.put('/:id', this.update)
    this.router.delete('/:id', this.delete)
    this.router.get('/:id/find', this.find)
  }
}

const characterRoutes = new UserRouter()

export default characterRoutes.router