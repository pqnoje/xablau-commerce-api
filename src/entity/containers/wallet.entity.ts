import * as Mongoose from "mongoose"
const Schema = Mongoose.Schema

export const Wallet = Mongoose.model('Wallet', { 
    balance: { type: Number, requeired: true, default: 0.0 },
    person: { type: Schema.Types.ObjectId, ref: 'Person', required: true },
})