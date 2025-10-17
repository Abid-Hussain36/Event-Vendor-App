import { Request, Response } from "express";
import User from "../schemas/User";
import { IUser } from "../schemas/User";
import { generateJWT } from "../utils/generate_token";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      profilePic,
      streetAddress,
      city,
      state,
      country,
      timezone,
      interests,
    } = req.body();

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: "User already exists!" });
    }

    const user = await User.create({
      name,
      email,
      password,
      profilePic,
      streetAddress,
      city,
      state,
      country,
      timezone,
      interests,
    });

    const token = generateJWT(user._id!.toString());
    const sentUser = await User.findOne({ email });

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: "Error in creating user!" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body();
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = generateJWT(user._id!.toString());
      res.status(200).json({ user, token });
    } else {
      res.status(401).json({ message: "Invalid credentials!" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error in logging in user!" });
  }
};
