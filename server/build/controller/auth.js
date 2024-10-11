"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const error_1 = require("../helper/error");
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ message: "Please fill all the fields" });
            return;
        }
        if (password.length < 6) {
            res
                .status(400)
                .json({ message: "Password must be at least 6 characters" });
            return;
        }
        const existingUser = await userModel_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User with this email already exists" });
            return;
        }
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const user = await userModel_1.default.create({
            name,
            email,
            password: hashPassword,
        });
        if (!user) {
            (0, error_1._500)("Failed to create user", "The Problem is in db", res);
            return;
        }
        res.status(201).json(user);
    }
    catch (error) {
        console.error(error);
        if (error instanceof Error) {
            (0, error_1._500)("Signup Failed", error.message, res);
        }
        else {
            (0, error_1._500)("Signup Failed", "An unknown error occurred", res);
        }
    }
};
exports.signup = signup;
