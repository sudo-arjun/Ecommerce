import { Router } from 'express'
import { parseUserObj, validateIfLoggedIn } from '../../middlewares/authMiddlewares.js';
import order from '../../models/order.js';
const ordersFile = 'orders/orders.ejs'
const router = Router();

router.get('/', parseUserObj, validateIfLoggedIn,async (req, res)=>{
    try{
        let orders = await order.find({customerId: req.userObj._id});
        res.render(ordersFile, { user: req?.userObj, orders })
    }
    catch(err){
        console.log(err);
        res.send({msg:"err"});
    }
})
export default router;