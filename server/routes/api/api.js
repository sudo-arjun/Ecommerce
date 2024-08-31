import {Router} from 'express';
import orderRoute from './order/order.js'

const router = Router();

router.use('/order',orderRoute);

export default router;