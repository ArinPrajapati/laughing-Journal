import User from "../models/userModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { _500 } from "../helper/error";

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

export { signup };
