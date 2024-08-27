import { Router } from 'express';
import product from '../../../../models/product.js';
// import multer from 'multer';
const router = Router();
// const imgUpload = multer({dest: 'images/'});
export default async function (req, res) {
    let { productName, productBrand, productPrice, productQuantity, productDescript = '' } = req.body;
    let currency = 'INR';
    console.log(req.file)
    let imgSrc = `/images/${req.file?.filename}`;
    // console.log(productName, req.file.path);

    if(productName && productBrand && productPrice && productQuantity && imgSrc){
        try{
            let productObj   = {
                productName,
                brand: productBrand,
                price: Number(productPrice),
                quantity: Number(productQuantity),
                description: productDescript,
                currency,
                imgSrc
            }
            console.log('in')
            let result = await product.create(productObj);
            console.log(result);
            res.send({msg:"product inserted"});
        }
        catch(e){
            console.log(e);
            res.send({msg:"couldn't insert product"});
        }
    }
        // sellerId
        // console.log(req.body);
    // console.log("request")
    // res.send({ "msg": "posted" })
}
