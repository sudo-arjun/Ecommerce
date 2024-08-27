import {Router} from 'express';
let router = Router();

router.get('/emailConfirmed', (req,res)=>{
    console.log('email confirmed');
})

export default router;
