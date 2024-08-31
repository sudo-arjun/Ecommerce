import mongoose from 'mongoose'
// const url = 'mongodb://localhost:27017/ecomDb'
// const url = 'mongodb://localhost:27018/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.15'
const url = 'mongodb://localhost:27018/ecomDb'


export default async function connect(){
    await mongoose.connect(url);
}