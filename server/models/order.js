import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    products: [
        {
            productId: mongoose.Schema.Types.ObjectId,
            productName: String,
            brand: String,
            imgSrc: String,
            orderedQuantity: Number,
            productPrice: Number
        }
    ],
    status: String,
    paymentType: String,
    billAmount: Number
})

const order = mongoose.model('order',orderSchema)
export default order;