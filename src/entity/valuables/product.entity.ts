import * as Mongoose from "mongoose"
const Schema = Mongoose.Schema

export const Product = Mongoose.model('Product', { 
    name: { type: String, required: true },
    value: { type: Number, required: true },
    title: { type: String },
    description: { type: String, required: true },
    amount: { type: Number, required: true, default: 0 },
    image: { type: String, required: true},
    shelfs: [{ type: Schema.Types.ObjectId, ref: 'Shelf', required: true }],
    promotion: { type: Schema.Types.ObjectId, ref: 'Promotion', required: true },
})
