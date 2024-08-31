import { Router, json } from 'express'
import jwt from 'jsonwebtoken'
import multer from 'multer';
import path from 'path'
import getMethod from './get/get.js'
import postMethod from './post/post.js'
import deleteMethod from './delete/delete.js'
import patchMethod from './patch/patch.js'
import putMethod from './put/put.js'
import {parseUserObj, validateIfLoggedIn, validateIfAdmin} from '../../../middlewares/authMiddlewares.js';
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
router.use(parseUserObj);
router.use(validateIfLoggedIn);
const secret = process.env.SECRET || 'chetan'
router.route('/')
    .get(getMethod)
    .post(validateIfAdmin, imgUpload.single('productImage'), postMethod)
    .patch(validateIfAdmin, imgUpload.single('productImage'), patchMethod)
    .put(validateIfAdmin, imgUpload.single('productImage'), putMethod)
    
router.route('/:id')
    .delete(validateIfAdmin, deleteMethod)



export default router;
