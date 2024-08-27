import mongoose from 'mongoose'
const url = 'mongodb://localhost:27017/ecomDb'

export default async function connect(){
    await mongoose.connect(url);
}