import * as Mongoose from "mongoose"
const Schema = Mongoose.Schema

export const Address = Mongoose.model('Address', { 
    street: { type: String, required: true },
    number: { type: String, required: true },
    complement: String,
    zipcode: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    person: { type: Schema.Types.ObjectId, ref: 'Person', required: true }
})