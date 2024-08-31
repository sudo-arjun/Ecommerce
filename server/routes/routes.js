import { Router } from 'express';
import jwt from 'jsonwebtoken'
const router = Router();
const _dirname = 'D:\\Code\\CQ\\ecom'
const homeFile = 'home/home.ejs'
const secret = process.env.SECRET || "chetan"
import { getProductsData } from '../lib/functions.js'

import signupRoute from './signup/index.js'
import loginRoute from './login/login.js'
import logoutRoute from './logout/logout.js'
import forgotPasswordRoute from './forgotPassword/forgotPassword.js'
import changePasswordRoute from './api/changePassword/changePassword.js'
import addToCartRoute from './api/addToCart/addToCart.js'
import cartRoute from './cart/cart.js'
import adminRoute from './admin/admin.js'
import productRoute from './api/product/product.js'
import userObj from '../middlewares/userObj.js';
import ordersRoute from './orders/orders.js'
import apiRoute from './api/api.js'

router.use('/signup',signupRoute);  
router.use('/login',loginRoute);
router.use('/logout',logoutRoute);
router.use('/forgotPassword',forgotPasswordRoute);
router.use('/changePassword',changePasswordRoute);
router.use('/cart',cartRoute);
router.use('/admin',adminRoute);
router.use('/orders',ordersRoute);
//api's
router.use('/addToCart',addToCartRoute);
router.use('/api/product',productRoute);
router.use('/api',apiRoute);

router.get('/', userObj, async (req, res, next) => {
    // res.send("resposne server is working");
    try {
        let data = await getProductsData();
        if(req?.userObj?.role == 'admin')
            res.redirect('/admin')
        else
            res.render(homeFile, { arr: data, user: req.userObj});
    }
    catch (err) {
        console.log("error at /");
    }
})
export default router;