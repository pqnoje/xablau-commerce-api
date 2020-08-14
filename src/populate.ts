import { AreaProvider } from './providers/marketplace/telzir/area.provider'
import { NationalFeeProvider } from './providers/marketplace/telzir/national-fee.provider'
import { PromotionProvider } from './providers/marketplace/telzir/promotion.provider'

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

    await AreaProvider.create({
        "code" : 18,
    })
    await AreaProvider.create({
        "code" : 11,
    })
    await AreaProvider.create({
        "code" : 16,
    })
    await AreaProvider.create({
        "code" : 17,
    })
    await NationalFeeProvider.create({
        "origin" : 11,
        "dist" : 16,
        "value" : 1.9,
    })
    await NationalFeeProvider.create({
        "origin" : 16,
        "dist" : 11,
        "value" : 2.9,
    })
    await NationalFeeProvider.create({
        "origin" : 16,
        "dist" : 17,
        "value" : 1.7,
    })
    await NationalFeeProvider.create({
        "origin" : 17,
        "dist" : 11,
        "value" : 2.7,
    })
    await NationalFeeProvider.create({
        "origin" : 11,
        "dist" : 18,
        "value" : 0.9,
    })
    await NationalFeeProvider.create({
        "origin" : 18,
        "dist" : 11,
        "value" : 1.9,
    })
    await PromotionProvider.create({
        "name" : "Fale Mais 30",
        "amount" : 30,
    })
    await PromotionProvider.create({
        "name" : "Fale Mais 60",
        "amount" : 60,
    })
    await PromotionProvider.create({
        "name" : "Fale Mais 120",
        "amount" : 120,
    })
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