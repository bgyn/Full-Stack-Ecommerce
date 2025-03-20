"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWTToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRECT_KEY = process.env.JWT_SECRET || "SECRECT_KEY";
const generateToken = (payload, expiresIn = "7d") => {
    return jsonwebtoken_1.default.sign(payload, SECRECT_KEY);
};
exports.generateToken = generateToken;
const verifyJWTToken = (token) => {
    return jsonwebtoken_1.default.verify(token, SECRECT_KEY);
};
exports.verifyJWTToken = verifyJWTToken;
