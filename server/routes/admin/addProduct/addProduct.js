import {Router} from "express"
const router = Router();
const _dirname = 'D:\\Code\\CQ\\ecom'
const addProductFile = 'admin/addProduct'

router.get('/',(req,res)=>{
    res.render(addProductFile, {userObj: req.userObj});
})

export default router;