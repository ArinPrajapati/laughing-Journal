import User from "../models/userModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { _500 } from "../helper/error";
import jwt from "jsonwebtoken";

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


export { signup, login };
