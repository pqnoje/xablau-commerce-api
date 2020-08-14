import * as Mongoose from "mongoose"
const Schema = Mongoose.Schema

export const Cart = Mongoose.model('Cart', { 
    status: { type: Number, requeired: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
})
