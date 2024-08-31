import { Router } from 'express';
import customer from '../../../models/customer.js';
import jwt from 'jsonwebtoken'
const secret = process.env.SECRET || "chetan";
const router = Router();

router.post('/', ifLogin, storeInDb)

async function ifLogin(req, res, next) {
    if (req.cookies?.accessToken && req.body.productId) {
        req.userObj = await jwt.verify(req.cookies.accessToken, secret);
        return next();
    }
    res.redirect('/login');
}

async function storeInDb(req, res) {
    try {
        req.body.quantity = Number(req.body.quantity);
        if (req.body.productId && req.body.quantity >= 0) {

            let updateObj = { $push: { cart: { productId: req.body.productId, quantity: 1 } } }, emailObj = { email: req.userObj.email };
            let resp = await customer.findOne({ email: req.userObj.email, 'cart.productId': req.body.productId }, { cart: true, _id: false })
            console.log(resp);

            if (resp?.cart) {
                emailObj['cart.productId'] = req.body.productId;
                if (req.body.quantity) {
                    //update product in cart
                    updateObj = { $set: { 'cart.$.quantity': req.body.quantity } }
                    console.log("updated");
                }
                else {
                    updateObj = { $pull: { cart: { productId: req.body.productId } } }
                    console.log("pulled");
                }
            }
            else
                console.log("pushed");

            let response = await customer.updateOne(
                emailObj,
                updateObj
            )
            res.send({ msg: `cart updated`, obj: updateObj })
        }
        else {
            return res.send({ msg: 'email or quantity not present' });
        }
    }
    catch (e) {
        console.log("error in storeInDb", e);
    }
}


export default router;