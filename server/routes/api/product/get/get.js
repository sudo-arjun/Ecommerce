import {Router} from 'express';
import {getProductsData} from '../../../../functions/functions.js'
const router = Router();

router.get('/',async (req,res)=>{
    let lim = req.query?.limit || 10; 
    let skip = req.query?.skip || 0; 
    let data = await getProductsData(lim,skip);
    res.send(data);
})

export default router;