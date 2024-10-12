"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.magicLogin = exports.login = exports.signup = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const error_1 = require("../helper/error");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodeMailler_1 = __importDefault(require("../config/nodeMailler"));
// create a new user
// post - /api/auth/signup
// body - name, email, password
// auth - false
// access - public
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
// send token which can used to get user details
// post - /api/auth/login
// body - email , password
// auth - false
// access - public
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Please fill all the fields" });
            return;
        }
        const getUser = await userModel_1.default.findOne({ email });
        if (!getUser) {
            res.status(400).json({ message: "User with this email does not exist" });
        }
        const isMatch = await bcrypt_1.default.compare(password, (getUser === null || getUser === void 0 ? void 0 : getUser.password) || "");
        if (!isMatch) {
            res.status(401).json({
                message: "Invalid Password ",
            });
        }
        const token = jsonwebtoken_1.default.sign({
            id: getUser === null || getUser === void 0 ? void 0 : getUser._id,
        }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(200).json({
            message: "Login Successfull",
            token: token,
        });
    }
    catch (error) {
        (0, error_1._500)("Login Failed", error.message, res);
    }
};
exports.login = login;
// send magic link which user can user for passwordless login
// post - /api/auth/magicLink
// body - email
// auth - false
// access - public
const magicLogin = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({
                message: "Please fill all the fields",
            });
        }
        const user = await userModel_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({
                message: "User Not Found ",
            });
        }
        const token = await jsonwebtoken_1.default.sign({
            id: user === null || user === void 0 ? void 0 : user._id,
        }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        await (0, nodeMailler_1.default)({
            from: "oleta73@ethereal.email",
            to: email,
            subject: "Magic Login Link",
            text: `Click on the link to login ${process.env.CLIENT_URL}/auth/login/${token}`,
            html: `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Magic Link Login</title>
      <style>
        @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
      </style>
    </head>
    <body class="bg-gray-100 my-10">
      <div class="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h1 class="text-2xl font-semibold text-gray-800 mb-4">Login with Magic Link</h1>
        <p class="text-gray-700 mb-6">
          Hello! Click the button below to securely log into your account.
        </p>
        <a target="_blank" href="${process.env.CLIENT_URL}/auth/login/${token}" 
           class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-center font-medium hover:bg-blue-700 transition-colors">
          Login Now
        </a>
        <p class="mt-6 text-sm text-gray-500">
          If you didn’t request this email, you can safely ignore it.
        </p>
      </div>
    </body>
    </html>`,
        });
        res.json({
            message: "Magic Login Link Sent",
        });
    }
    catch (error) {
        (0, error_1._500)("Magic Login Failed", error.message, res);
    }
};
exports.magicLogin = magicLogin;
const updatePassword = async (req, res) => {
    try {
    }
    catch (error) {
        (0, error_1._500)("Update Password Failed", error.message, res);
    }
};
