import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js"
import multer from "multer";
import fs from "fs";
import jwt from "jsonwebtoken";
import path from "path"
export const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    let id = user._id
    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ id }, process.env.JWT_SECRET ,{ expiresIn: "24h" });
  
      res.cookie("auth_token", token, {
        httpOnly: true, // Secure against XSS
        secure: true, // Set to true in production (HTTPS)
        sameSite: "None",
        maxAge: 24000 * 60 * 60, // 1 hour
      });
  
      return res.status(200).json({ message: "Login successful" });
    
    } else {
      
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// @desc Register new user with image upload
// @route POST /api/users/register
// @access Public
export const registerUser = asyncHandler(async(req, res) => {
  const { name, email, password } = req.body;
  const profileImagepath = req.file ? req.file.path : null;

  // Handle user registration logic
  
const userExists = await User.findOne({ email });
const usernameExists = await User.findOne({ name });
if (usernameExists) {
  res.status(400);
  throw new Error("Username already exists");
}
if (userExists) {
  res.status(400);
  throw new Error("Email already exists");
}

const user = await User.create({ name, email, password, image: profileImagepath });

if (user) {
  res.status(201).json({
    message: "User registered successfully",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image || "No image uploaded",
    },
  });
} else {
  res.status(400);
  throw new Error("Invalid user data");
}
});
