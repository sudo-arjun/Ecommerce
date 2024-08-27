import mongoose from 'mongoose'

//create schema
let customerSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    lastLogin: Date,
    cart: [
        {
            productId: mongoose.Schema.Types.ObjectId,
            quantity: Number,
        }
    ],
    wishList: [
        {
            productId: mongoose.Schema.Types.ObjectId,
            quantity: Number,
        }
    ],
    role: String
})

let customer = mongoose.model('customer',customerSchema);

export default customer;