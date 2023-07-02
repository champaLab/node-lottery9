"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.sign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environment_1 = __importDefault(require("./environment"));
const i = "Champalab";
const s = "sonephetmnl@gmail.com";
const a = "https://champalab.com";
const signOption = {
    issuer: i,
    algorithm: 'RS256',
    subject: s,
    audience: a,
    expiresIn: "356day",
};
const sign = (payload) => {
    const privateKey = environment_1.default.PRIVATE_KEY || "";
    return jsonwebtoken_1.default.sign(payload, privateKey, signOption);
};
exports.sign = sign;
const verify = (req, res, next) => {
    var _a;
    const headers = req.headers[environment_1.default.JWT_HEADER];
    let token = null;
    if (headers) {
        token = `${headers}`.replace('Bearer ', '');
    }
    if (!token) {
        return res.json({
            status: "error",
            message: "Token is invalid"
        });
    }
    const public_key = (_a = environment_1.default.PUBLIC_KEY) !== null && _a !== void 0 ? _a : "";
    jsonwebtoken_1.default.verify(token, public_key, signOption, (error, decoded) => {
        if (error) {
            console.log(error);
            return res.json({
                status: "error",
                message: "Can not verify signature"
            });
        }
        req.body.user = decoded;
        next();
    });
};
exports.verify = verify;
