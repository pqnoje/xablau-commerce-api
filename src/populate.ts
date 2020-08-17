import { AreaProvider } from './providers/marketplace/telzir/area.provider'
import { NationalFeeProvider } from './providers/marketplace/telzir/national-fee.provider'
import { PromotionProvider } from './providers/marketplace/promotion.provider'

import * as Mongoose from "mongoose"

let database: Mongoose.Connection
const populateMongo = () => {
  const uri = "mongodb://localhost:27017/test?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

  if (database) {
    return
  }

  Mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })

  database = Mongoose.connection

  database.once("open", async () => {
    console.log("Connected to database!!!")

    
    disconnect()
  })

  database.on("error", error => {
    console.log("Error connecting to database")
  })
}

const disconnect = () => {
  if (!database) {
    return
  }
  
  Mongoose.disconnect()
}

populateMongo()