import {Router} from 'express';
import product from '../../models/customer.js'
import {sendMailLink} from '../../middlewares/sendMail.js';
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
const _dirname = 'D:\\Code\\CQ\\ecom'
const router = Router();
let links = {};
const server = 'http://localhost:3000'
const resetFile = '/client/src/reset/reset.html';
router.post('/',async (req,res)=>{
    if(req.body.email){
        const dbResponse = await product.findOne({email:req.body.email});
        console.log(dbResponse);
        if(dbResponse){
            //sendmail
            console.log('in post of forp');
            let secretCode = crypto.randomBytes(24).toString('hex');
            let link = `${server}/forgotPassword/${secretCode}`;
            links[secretCode] = req.body.email;
            console.log(link);
            await sendMailLink(req.body.email,link);
            return res.send({'msg':'link to reset send on email'})
        }
        else{
            return res.send({msg:'this email is not linked'})
        }
    }
    res.send({msg:'enter email'});
})

router.get('/:sCode',(req,res)=>{
    console.log(req.params);
    let payload = {
        email : links[req.params.sCode],
        generatedFrom: 'forgotPassword'
    }
    let passToken = jwt.sign(payload,'chetan');
    res.cookie('passToken',passToken)
    res.sendFile(`${_dirname}${resetFile}`);
})


export default router;