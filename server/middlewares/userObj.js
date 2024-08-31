import jwt from 'jsonwebtoken'
const secret = process.env.SECRET || 'chetan'
export default function userObj(req, res, next) {
    if (req.cookies.accessToken) {
        userObj = jwt.verify(req.cookies.accessToken, secret);
        req.userObj = userObj;
    }
    return next();
}
