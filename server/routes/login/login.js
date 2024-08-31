import {Router} from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import customer from '../../models/customer.js'
import userObj from "../../middlewares/userObj.js";
const router = Router();
const _dirname = 'D:\\Code\\CQ\\ecom'
const loginFile = '/client/src/login/login.ejs'
const secret = process.env.SECRET || "chetan"

router.route('/').get((req, res) => {
    //check if it has signup cookie/token
    // const userObj = 
    // if(req?.userObj){
        // if(userObj.verified == true){   
            //generate new token and send it in cookie
            // return res.render(`${_dirname}${loginFile}`,{classes: '',user: req.userObj})
        // }
    // }
    res.render(`${_dirname}${loginFile}`,{classes: 'hidden', user: {email: null, role: null, loggedIn: null}})
})
.post(async (req,res)=>{
    console.log('got login req')
    try{
        let {email, password} = req.body;   
        let dbResponse = await customer.findOne({email:email});
        console.log('here',dbResponse);
        if(dbResponse != null){
            let {password: hashedPass} = dbResponse;
            console.log(password,hashedPass);
            let result = await bcrypt.compare(password,hashedPass);
            let role = dbResponse?.role;
            //password matched
            if(result){
                console.log('password matched');
                let payload = {
                    _id: dbResponse._id,
                    email: email,
                    loggedIn: true,
                    role: role
                }
                let token = jwt.sign(payload,secret);
                res.cookie('accessToken',token);
                return res.redirect('/');
            }
            else{
                return res.send({'msg':'password is wrong'});
            }
        }
        else{
            //email doesn't exist
            return res.send({'msg': "email doesn't exists"});
        }
    }
    catch(e){
        return res.send({'msg':'something went wrong'})
    }
})

router.get('/autoLogin',(req,res)=>{
    let accessToken = req.cookies.accessToken;
    if(accessToken){
        let userObj = jwt.verify(accessToken, secret);
        console.log(userObj);
        if(userObj.verified == true){
            //generate new token and send it in cookie
            delete userObj.verify;
            userObj.loggedIn = true;
            userObj.role = 'customer'
            accessToken = jwt.sign(userObj, secret);
            res.cookie('accessToken',accessToken);
            return res.redirect('/');
        }
    }
    res.redirect('/login');
    
})
export default router;