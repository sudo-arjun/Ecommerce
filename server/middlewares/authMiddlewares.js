import jwt from 'jsonwebtoken'
const secret = process.env.SECRET || 'chetan'

export function parseUserObj(req, res, next) {
    if (req.cookies.accessToken) {
        let userObj = jwt.verify(req.cookies.accessToken, secret);
        req.userObj = userObj;
    }
    else
        req.userObj = null;
    return next();
}

export async function validateIfLoggedIn(req, res, next) {
    if (req?.userObj) {
        if (req.userObj?.loggedIn) {
            return next();
        }
        res.clearCookie('accessToken')
        return res.status(400).send({ 'msg': "bad token, retry" })
    }
    return res.status(401).send({ 'msg': "You are not logged in" })
}

export function validateIfAdmin(req, res, next) {
    if (req.userObj?.role == "admin") {
        return next();
    }
    return res.status(403).send({ msg: "Not authorised" });
}