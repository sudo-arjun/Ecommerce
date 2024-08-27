import { Router, json } from 'express'
import jwt from 'jsonwebtoken'
import multer from 'multer';
import path from 'path'
import getMethod from './get/get.js'
import postMethod from './post/post.js'
import deleteMethod from './delete/delete.js'
import patchMethod from './patch/patch.js'
import putMethod from './put/put.js'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'client/images/')
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
const imgUpload = multer({storage:storage});
const router = Router();
const secret = process.env.SECRET || 'chetan'
router.route('/')
    .get(ifUser, getMethod)
    .post(ifUser, ifAdmin, imgUpload.single('productImage'), postMethod)
    .patch(ifUser, ifAdmin, imgUpload.single('productImage'), patchMethod)
    .put(ifUser, ifAdmin, imgUpload.single('productImage'), putMethod)
    
router.route('/:id')
    .delete(ifUser, ifAdmin, deleteMethod)

async function ifUser(req, res, next) {
    const accessToken = req.cookies?.accessToken;
    if (accessToken) {
        const userObj = await jwt.verify(accessToken, secret);
        if (userObj.email) {
            req.userObj = userObj;
            return next();
        }
        return res.status(400).send({ 'msg': "bad token" })
    }
    return res.status(401).send({ 'msg': "no token" })
}
function ifAdmin(req, res, next) {
    if (req.userObj.role == "admin") {
        return next();
    }
    return res.status(403).send({ msg: "Not authorised" });
}
export default router;
