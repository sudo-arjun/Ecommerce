export default function validateIfAdmin(req, res, next) {
    if (req.userObj?.role == "admin") {
        return next();
    }
    else {
        return res.status(403).send({ msg: "Not authorised" });
    }
}