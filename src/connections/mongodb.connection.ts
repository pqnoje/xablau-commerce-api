import * as Mongoose from "mongoose"

let database: Mongoose.Connection
export const connectMongo = () => {
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
  })

  database.on("error", error => {
    console.log("Error connecting to database")
  })
}

export const disconnect = () => {
  if (!database) {
    return
  }
  
  Mongoose.disconnect()
}