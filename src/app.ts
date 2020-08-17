import UserRouter from './routes/user.router'
import PersonRouter from './routes/person.router'
import AddressRouter from './routes/address.router'
import ShelfRouter from './routes/shelf.router'
import CartRouter from './routes/cart.router'
import ProductRouter from './routes/product.router'
import CheckoutRouter from './routes/checkout.router'
import WalletRouter from './routes/wallet.router'
import DeliveryRouter from './routes/delivery.router'
import PromotionRouter from './routes/marketplace/promotion.router'
import * as express from 'express'
import * as logger from 'morgan'
import * as bodyParser from 'body-parser'
import { connectMongo } from './connections/mongodb.connection'

class App {
  public express: express.Application

  constructor() {
    this.express = express()
    this.middleware()
    this.routes()
    connectMongo()
  }

  private middleware(): void {
    this.express.use(logger('dev'))
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: false }))
  }

  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router()
    // placeholder route handler
    router.get('/', (req, res, next) => {
      res.json({
        message: 'Ecommerce API'
      })
    })

    this.express.use('/', router)
    this.express.use('/api/v1/users', UserRouter)
    this.express.use('/api/v1/people', PersonRouter)
    this.express.use('/api/v1/addresses', AddressRouter)
    this.express.use('/api/v1/shelfs', ShelfRouter)
    this.express.use('/api/v1/carts', CartRouter)
    this.express.use('/api/v1/products', ProductRouter)
    this.express.use('/api/v1/wallets', WalletRouter)
    this.express.use('/api/v1/checkouts', CheckoutRouter)
    this.express.use('/api/v1/deliveries', DeliveryRouter)

    this.express.use('/api/v1/marketplace/promotions', PromotionRouter)
  }
}

export default new App().express