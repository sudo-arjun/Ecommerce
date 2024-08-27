import { Router } from 'express';
import jwt from 'jsonwebtoken'
const router = Router();
const server = 'http://localhost:3000'
const _dirname = 'D:\\Code\\CQ\\ecom'
const homeFile = 'home/home.ejs'
import { getProductsData } from '../functions/functions.js'

import signupRoute from './signup/index.js'
import loginRoute from './login/login.js'
import logoutRoute from './logout/logout.js'
import forgotPasswordRoute from './forgotPassword/forgotPassword.js'
import changePasswordRoute from './api/changePassword/changePassword.js'
import addToCartRoute from './api/addToCart/addToCart.js'
import cartRoute from './cart/cart.js'
import adminRoute from './admin/admin.js'
import productRoute from './api/product/product.js'

router.use('/signup',signupRoute);  
router.use('/login',loginRoute);
router.use('/logout',logoutRoute);
router.use('/forgotPassword',forgotPasswordRoute);
router.use('/changePassword',changePasswordRoute);
router.use('/cart',cartRoute);
router.use('/admin',adminRoute);
//api's
router.use('/addToCart',addToCartRoute);
router.use('/api/product',productRoute);

router.get('/', getUserObj, async (req, res, next) => {
    // res.send("resposne server is working");
    try {
        let data = await getProductsData();
        if(req.userObj.role == 'admin')
            res.redirect('/admin')
        else
            res.render(homeFile, { arr: data, user: req.userObj });
    }
    catch (err) {
        console.log("error at /");
    }
})
function getUserObj(req, res, next) {
    let userObj;
    // console.log()
    if (req.cookies.accessToken) {
        userObj = jwt.verify(req.cookies.accessToken, 'chetan');
    }
    else {
        userObj = {
            email: "Guest",
            role: "guest"
        }
    }
    if (userObj.email && userObj.role) {
        req.userObj = userObj;
        return next();
    }
    return res.send({"msg":"invalid token"});
}
export default router;