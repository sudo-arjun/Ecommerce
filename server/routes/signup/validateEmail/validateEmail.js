import {Router} from 'express';
import crypto from 'crypto'
import sendMail from '../../../middlewares/sendMail.js';
import jwt from 'jsonwebtoken';
import customer from '../../../models/customer.js'
let router = Router();
const secret = process.env.SECRET || "chetan"

// let save
//to get secret URL
router.route('/validateEmail').post(ifEmailExits, async (req,res)=>{
    console.log(req.body);
    if(req.body.pass1 == req.body.pass2){
        let otp = generateOtp();
        console.log(otp);
        const payload = {
            email: req.body.email,
            password: req.body.pass1,
            otp
        }
        sendMail(req.body.email,JSON.stringify(payload));
        let accessToken = jwt.sign(payload, secret);
        res.cookie('accessToken', accessToken);
        return res.send({'msg':"email sent"});
    }
    return res.status(400).send({"msg":"password doesn't match"});

})
async function ifEmailExits(req,res,next){
    if(req.body.email && req.body.pass1){
        let result = await customer.find({email:req.body.email})
        if(result.length){
            return res.status(400).send({'msg':'account with this email already exits'});
        }
        return next();
    }
    res.send({msg:"Enter mail or password"})
}
function generateOtp(size = 4){
    let otp = Math.round((Math.random()*10000));
    return otp;
}
export default router;

// async function validateEmail(req,res,next){
//     if(req.pass1 == req.pass2){
//         const uniqueCode = crypto.randomBytes(24).toString('hex');
//         const uniqueLink = `${server}/${uniqueCode}`
//         sendMail(req.email,uniqueLink)
        
//     }
// }