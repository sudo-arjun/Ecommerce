import { Router } from 'express';
import product from '../../../../models/product.js';
const router = Router();
export default async function (req, res) {
    console.log(req.body);
    try {
        let { _id, productName, productBrand = "", productPrice = "", productQuantity = "", productDescript = '' } = req.body;
        let currency = 'INR';

        console.log(productName);

        if (_id && productName && productBrand && productPrice && productQuantity) {
            let updateObj = {
                productName,
                brand: productBrand,
                price: Number(productPrice),
                quantity: Number(productQuantity),
                description: productDescript,
                currency,
            }
            console.log(updateObj);
            if (req.file)
                productObj.imgSrc = `/images/${req.file?.filename}`;
            console.log('in',_id)
            let result = await product.findByIdAndUpdate(_id, updateObj,{new:true})
            console.log(result);
           return  res.send({ msg: "updated", data: result});

        }
        return res.status(400).send({msg:"wrong request"})
    }
    catch (e) {
        console.log(e);
        res.send({ msg: "couldn't update the product" });
    }
    // sellerId
    // console.log(req.body);
    // console.log("request")
    // res.send({ "msg": "posted" })
}
