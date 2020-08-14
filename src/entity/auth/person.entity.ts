import * as Mongoose from "mongoose"
const Schema = Mongoose.Schema

export const Person = Mongoose.model('Person', { 
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthday: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    address: [{ type: Schema.Types.ObjectId, ref: 'Address' }],
})
