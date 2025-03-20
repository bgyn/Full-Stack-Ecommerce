"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const jwt_1 = require("../utils/jwt");
const prisma = new client_1.PrismaClient();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            res.status(400).json({ message: "Please fill all the fields" });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        yield prisma.profile.create({
            data: {
                userId: user.id,
                name,
            },
        });
        const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
        const token = (0, jwt_1.generateToken)(Object.assign({}, userWithoutPassword));
        res.status(201).json({ token });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            res.status(400).json({ message: "Please fill all the fields" });
            return;
        }
        const user = yield prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: "Invalid password" });
            return;
        }
        const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
        const token = (0, jwt_1.generateToken)(Object.assign({}, userWithoutPassword));
        res.status(200).json({ token });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
exports.login = login;
