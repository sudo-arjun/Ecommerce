import {Router} from 'express';
import product from '../../../../models/product.js';
const router = Router();

export default (async (req,res)=>{
    try{
        let _id = req.params.id;
        let dbResp = await product.deleteOne({_id});
        console.log(dbResp);
        if(dbResp.deletedCount)
            res.send({msg:"deleted"});
        else
            res.send({msg:"Not found"});
    }
    catch(e){
        console.log(e);
        res.send({msg: "couldn't delete"});
    }
})
