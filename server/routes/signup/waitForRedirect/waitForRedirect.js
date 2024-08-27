import {Router} from 'express';
let router = Router();
router.get('/waitForRedirect', (req,res)=>{
    console.log('wait for redirect');
})

export default router;