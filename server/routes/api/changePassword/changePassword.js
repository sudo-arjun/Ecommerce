import { Router } from "express";
import jwt from 'jsonwebtoken';
import customer from "../../../models/customer.js";
import bcrypt from 'bcrypt'
const router = Router();
const secret = process.env.SECRET || "chetan"
router.post('/',async (req,res)=>{
    if(req.cookies.passToken){
        let {email} = jwt.verify(req.cookies.passToken,secret);
        if(req.body.pass1 == req.body.pass2){
            //update them
            let hashedPass = await bcrypt.hash(req.body.pass1,10);
            let resp = await customer.updateOne({email:email},{$set:{password:hashedPass}});
            console.log(resp);
            res.cookie('passToken','');
            return res.send({'msg':'udated'})
        }
        else
            return res.send({'msg':'password are not same'})
    }
    return res.status(401).send({'msg':'not authorised'})
})

export default router;