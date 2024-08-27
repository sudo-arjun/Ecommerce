import {Router} from 'express';
// import emailConfirmed from './emailConfirmed/emailConfirmed.js';
// import waitForRedirect from './waitForRedirect/waitForRedirect.js';
import validateEmail from './validateEmail/validateEmail.js';
import verifyOtp from './verifyOtp/verifyOtp.js'
const _dirname = 'D:\\Code\\CQ\\ecom'
const signupFile = '/client/src/signup/signup.html'

let router = Router();
// router.use(emailConfirmed)
// router.use(waitForRedirect)
router.use(validateEmail)
router.use(verifyOtp);

//signup route
router.route('/').get((req, res) => {
    res.sendFile(_dirname + signupFile)
})

export default router;