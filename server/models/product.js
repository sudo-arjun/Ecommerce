import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
        "productName": String,
        "imgSrc": String, 
        "brand": String,
        "price": Number,
        "quantity": Number,
        "currency": String,
        "sellerId": String,
        "description": String
})
let product = mongoose.model('product',productSchema);
export default product;