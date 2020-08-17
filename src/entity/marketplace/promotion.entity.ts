import * as Mongoose from "mongoose"
const Schema = Mongoose.Schema

export const Promotion = Mongoose.model('Promotion', { 
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    promotionalText: { type: String },
    description: { type: String, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
})