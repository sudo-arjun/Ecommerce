import { Router } from 'express';
import jwt from 'jsonwebtoken';
import customer from '../../models/customer.js';
import product from '../../models/product.js';
const router = Router();
const cartFile = 'cart/cart.ejs'

router.route('/').get(async (req, res) => {
    console.log(req.cookies);
    if (req.cookies.accessToken) {
        const userObj = jwt.verify(req.cookies.accessToken, 'chetan');
        console.log(userObj);
        if(userObj.role == 'admin')
            return res.redirect('/admin');
        const cartArr = await getCartDataFromId(userObj._id);
        res.render(cartFile, { cartArr, user: userObj })
    }
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