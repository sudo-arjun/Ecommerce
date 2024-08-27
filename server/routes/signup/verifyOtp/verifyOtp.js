import {Router} from 'express';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import customer from '../../../models/customer.js'
const router = Router();
router.post('/verifyOtp',async (req,res)=>{
    // console.log(req.body.otp)
    let accessToken = req.cookies?.accessToken;
    if(accessToken && req.body.otp){
        let userObj = jwt.verify(accessToken,'chetan');
        if(userObj.otp == req.body.otp){
            //
            console.log("redirected to login");
            delete userObj.otp;
            userObj.verified = true;
            userObj.password = await createPassHash(userObj.password);
            let result = await storeInDb(userObj);
            delete userObj.password;
            userObj._id = result._id;
            res.cookie('accessToken',jwt.sign(userObj,'chetan'));
           return res.redirect('/login');
        }
    }
    res.status(401).send({'msg':'not verified'});
})

async function createPassHash(plainPass){
    let hashedPassword = await bcrypt.hash(plainPass,10);
    console.log(hashedPassword,plainPass);
    return hashedPassword;
}
async function storeInDb(userObj){
    try{

        let user = {
            email: userObj.email,
            password: userObj.password
        }
        return await customer.create(user);
    }catch(e){
        console.log("some error while inserting in user db");
    }
}
export default router;