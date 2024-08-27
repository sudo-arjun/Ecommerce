import {Router} from "express"
import { getProductsData } from "../../../functions/functions.js";
const router = Router();
const secret = process.env.SECRET || 'chetan';
const _dirname = 'D:\\Code\\CQ\\ecom'
const viewProductFile = 'admin/viewEditProduct'

router.route('/').get(async (req,res)=>{
    try{
        let data = await getProductsData();
        res.render(viewProductFile,{arr:data, userObj:req.userObj});
    }
    catch(e){
        console.log('error in viewEdit route',e);
    }
});

export default router;