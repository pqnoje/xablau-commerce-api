import * as Mongoose from "mongoose"
const Schema = Mongoose.Schema
import { CheckouStatuses } from '../../constants/checkout-statuses.enum'

export const Checkout = Mongoose.model('Checkout', {
    status: { type: Number, required: true, default: CheckouStatuses.OPENED},
    person: { type: Schema.Types.ObjectId, ref: 'Person', required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
})