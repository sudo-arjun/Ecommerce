import {Router} from "express"
import jwt from 'jsonwebtoken'
import addProductRoute from './addProduct/addProduct.js';
import viewEditProductRoute from './viewEditProduct/viewEditProduct.js';
const router = Router();
const secret = process.env.SECRET || 'chetan';
const _dirname = 'D:\\Code\\CQ\\ecom'
const adminFile = 'admin/adminPanel.ejs'

router.use(validateIfAdmin);
router.use('/addProduct',addProductRoute);
router.use('/viewEditProduct',viewEditProductRoute);

router.route('/').get((req,res)=>{
    res.render(`${adminFile}`);
})

function validateIfAdmin(req,res,next){
    const accessToken = req.cookies?.accessToken;
    if(accessToken){
        const userObj = jwt.verify(accessToken,secret);
        console.log(userObj);
        if(userObj.role == "admin"){
            req.userObj = userObj;
            return next();
        }
        else{
            return res.send({msg:"Not authorised"});
        }
    }
    return res.send({msg: "invalid Token"});
}

export default router;