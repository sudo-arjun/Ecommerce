import { Router } from 'express';
import jwt from 'jsonwebtoken';
import customer from '../../models/customer.js';
import product from '../../models/product.js';
import userObj from '../../middlewares/userObj.js';
const router = Router();
const cartFile = 'cart/cart.ejs'
const loginFile = 'login/login.ejs'
const secret = process.env.SECRET || "chetan"

router.route('/').get(userObj, async (req, res) => {
    // console.log(req.cookies);
    if (req.userObj) {
        console.log(userObj);
        if(userObj?.role == 'admin')
            return res.redirect('/admin');
        const cartArr = await getCartDataFromId(userObj?._id);
        console.log(cartArr);
        res.render(cartFile, { cartArr, user: userObj })
        console.log(cartArr);
    }
    else
        res.redirect('/login');
})

async function getCartDataFromId(_id) {
    try {
        const result = await customer.findById(_id, { cart: true });
        const cart = result.cart;
        const productArr = [];
        console.log(cart);
        for(const cartObj of cart){
            const productData = await product.findById(cartObj.productId);
            productData.productCartQuantity = cartObj.quantity;
            productArr.push(productData);
        }
        return productArr;
    }
    catch (e) {
        console.log("Error in getCartDataFromId: ", e);
    }
}
export default router;