import User from "../models/userModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { _500 } from "../helper/error";
import jwt from "jsonwebtoken";
import sendEmail from "../config/nodeMailler";

// create a new user
// post - /api/auth/signup
// body - name, email, password
// auth - false
// access - public
const signup = async (req: Request, res: Response): Promise<void> => {
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

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User with this email already exists" });
      return;
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    if (!user) {
      _500("Failed to create user", "The Problem is in db", res);
      return;
    }

    res.status(201).json(user);
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      _500("Signup Failed", error.message, res);
    } else {
      _500("Signup Failed", "An unknown error occurred", res);
    }
  }
};

// send token which can used to get user details
// post - /api/auth/login
// body - email , password
// auth - false
// access - public

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Please fill all the fields" });
      return;
    }
    const getUser = await User.findOne({ email });
    if (!getUser) {
      res.status(400).json({ message: "User with this email does not exist" });
    }
    const isMatch = await bcrypt.compare(password, getUser?.password || "");

    if (!isMatch) {
      res.status(401).json({
        message: "Invalid Password ",
      });
    }
    const token = jwt.sign(
      {
        id: getUser?._id,
      },
      process.env.JWT_SECRET as jwt.Secret,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login Successfull",
      token: token,
    });
  } catch (error: any) {
    _500("Login Failed", error.message, res);
  }
};

// send magic link which user can user for passwordless login
// post - /api/auth/magicLink
// body - email
// auth - false
// access - public

const magicLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({
        message: "Please fill all the fields",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({
        message: "User Not Found ",
      });
    }

    const token = await jwt.sign(
      {
        id: user?._id,
      },
      process.env.JWT_SECRET as jwt.Secret,
      {
        expiresIn: "7d",
      }
    );

    await sendEmail({
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
  } catch (error) {
    _500("Magic Login Failed", (error as Error).message, res);
  }
};

const updatePassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    if (!email || !oldPassword || !newPassword) {
      res.status(400).json({ message: "Please fill all the fields" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
      return;
    }

    const isMatch = await bcrypt.compare(oldPassword, user?.password || "");
    if (!isMatch) {
      res.status(401).json({ message: "Invalid Password" });
      return;
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    await user.save();

    res.status(200).json({ message: "Password Updated" });
  } catch (error) {
    _500("Update Password Failed", (error as Error).message, res);
  }
};
export { signup, login, magicLogin, updatePassword };
