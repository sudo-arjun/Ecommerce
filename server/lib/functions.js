import product from '../models/product.js'
export async function getProductsData(lim = 10, ski = 0){
    return await product.find({}).skip(ski).limit(lim);
}
