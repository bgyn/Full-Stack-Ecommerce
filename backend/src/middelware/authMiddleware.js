"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictTo = exports.verifyToken = void 0;
const jwt_1 = require("../utils/jwt");
const verifyToken = (req, res, next) => {
    var _a, _b;
    const tokenCookie = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    const tokenHeader = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
    const token = tokenCookie || tokenHeader;
    // If no token is provided, don't proceed to the next middleware
    if (!token) {
        res.status(401).json({ message: "No token provided" });
        return;
    }
    try {
        const decoded = (0, jwt_1.verifyJWTToken)(token);
        req.user = decoded;
        next(); // Proceed to the next middleware or route handler
    }
    catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};
exports.verifyToken = verifyToken;
const restrictTo = (roles = []) => {
    return (req, res, next) => {
        // If the user is not authenticated, deny access
        if (!req.user) {
            if (req.accepts("html")) {
                res.redirect("/login");
                return;
            }
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        // If the user's role is not allowed, deny access
        if (!roles.includes(req.user.role)) {
            if (req.accepts("html")) {
                res.status(403).send("You are not allowed to access this route.");
                return;
            }
            res
                .status(403)
                .json({ message: "You are not allowed to access this route." });
            return;
        }
        // If everything is good, proceed to the next middleware or route handler
        return next();
    };
};
exports.restrictTo = restrictTo;
