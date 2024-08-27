import {Router} from 'express';
const router = Router();

router.get('/',(req,res)=>{
    console.log('logout route');
    console.log(req.cookies);
    res.cookie('accessToken','')
    res.redirect('/');
})

export default router;