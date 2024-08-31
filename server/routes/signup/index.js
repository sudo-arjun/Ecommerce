import {Router} from 'express';
import userObj from '../../middlewares/userObj.js'
// import emailConfirmed from './emailConfirmed/emailConfirmed.js';
// import waitForRedirect from './waitForRedirect/waitForRedirect.js';
import validateEmail from './validateEmail/validateEmail.js';
import verifyOtp from './verifyOtp/verifyOtp.js'
const signupFile = 'signup/signup.ejs'

let router = Router();
// router.use(emailConfirmed)
// router.use(waitForRedirect)
router.use(validateEmail)
router.use(verifyOtp);

//signup route
router.route('/').get(userObj, (req, res) => {
    console.log(req.userObj)
    res.render(signupFile, {user: req.userObj})
})

export default router;