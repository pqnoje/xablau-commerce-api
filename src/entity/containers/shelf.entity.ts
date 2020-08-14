import * as Mongoose from "mongoose"
const Schema = Mongoose.Schema

export const Shelf = Mongoose.model('Shelf', { 
    name: { type: String, requeired: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
})