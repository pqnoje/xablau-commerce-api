import { Router, Request, Response, NextFunction } from 'express'
import { CharacterProvider } from '../providers/CharacterProvider'

export class CharacterRouter {
  public router: Router

  constructor() {
    this.router = Router()
    this.init()
  }

  private getAll(req: Request, res: Response, next: NextFunction) {
    let offset = 0
    let allCharacters = new Array<any>()

    CharacterProvider.getAll(offset).then(characters => {
      offset += 100
      allCharacters.push.apply(allCharacters, characters.results)

      let totalCharacters = characters.total
      let listOfPromisesToBeFetched = Math.floor(totalCharacters / 100)
      let promises = new Array<Promise<any>>()

      for (let i = 0; i <= listOfPromisesToBeFetched; i++) {
        promises.push(CharacterProvider.getAll(offset))
        offset += 100
      }

      Promise.all(promises).then(allResults => {
        allResults.forEach(characters => {
          allCharacters.push.apply(allCharacters, characters.results)
        })
        res.send(allCharacters)
      }, err => res.send(err))
    }, err => res.send(err))
  }

  init() {
    this.router.get('/', this.getAll)
  }
}

const characterRoutes = new CharacterRouter()

export default characterRoutes.router