import * as Mongoose from "mongoose"
const Schema = Mongoose.Schema

export const NationalFee = Mongoose.model('NationalFee', { 
    origin: { type: Number, required: true },
    dist: { type: Number, required: true },
    value: { type: Number, required: true}
})