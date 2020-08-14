import * as Mongoose from "mongoose"
const Schema = Mongoose.Schema

export const Area = Mongoose.model('Area', { 
    code: { type: Number, required: true }
})