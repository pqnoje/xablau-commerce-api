import * as Mongoose from "mongoose"
const Schema = Mongoose.Schema
import { DeliveryStatuses } from '../../constants/delivery-statuses.enum'

export const Delivery = Mongoose.model('Delivery', {
    person: { type: Schema.Types.ObjectId, ref: 'Person', required: true },
    address: { type: Schema.Types.ObjectId, ref: 'Address', required: true },
    status: [{ type: Number, required: true, default: DeliveryStatuses.OPENED }],
})