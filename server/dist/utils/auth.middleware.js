"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.SECRET || '';
const checkAuth = async (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET);
        req._id = decoded._id;
        next();
    }
    catch (err) {
        return res
            .status(403)
            .json({ message: 'Invalid token', error: err.message });
    }
};
exports.checkAuth = checkAuth;
