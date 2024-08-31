import { Router } from "express"
import jwt from 'jsonwebtoken'
import addProductRoute from './addProduct/addProduct.js';
import viewEditProductRoute from './viewEditProduct/viewEditProduct.js';
import userObj from "../../middlewares/userObj.js";
import validateIfAdmin from '../../middlewares/validateIfAdmin.js'
const router = Router();
const secret = process.env.SECRET || 'chetan';
const _dirname = 'D:\\Code\\CQ\\ecom'
const adminFile = 'admin/adminPanel.ejs'

router.use(userObj);
router.use(validateIfAdmin);
router.use('/addProduct', addProductRoute);
router.use('/viewEditProduct', viewEditProductRoute);

router.route('/').get((req, res) => {
    res.render(adminFile, { userObj: req.userObj });
})

export default router;