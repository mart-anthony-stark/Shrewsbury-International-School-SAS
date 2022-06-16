"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jwt = require("jsonwebtoken");
const createToken = (body, secret, expiresIn) => {
    return jwt.sign({ body }, secret, {
        expiresIn,
    });
};
exports.createToken = createToken;
const verifyToken = (req, res, next) => {
    const authHeader = req.headers["access-token"];
    if (!authHeader)
        return res.status(403).send({ error: "Unauthenticated" });
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
        if (err)
            return res.status(403).send({ error: "Invalid Token" });
        console.log(user);
        req.user = user.body;
        next();
    });
};
exports.verifyToken = verifyToken;
