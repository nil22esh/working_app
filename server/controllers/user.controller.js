import { validationResult } from "express-validator";
import {
  allUsers,
  createUser,
  singleUser,
} from "../repository/user.repository.js";
import User from "../models/user.schema.js";

export const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  const {
    name,
    email,
    password,
    phone,
    role,
    skills,
    location,
    available,
    language,
  } = req.body;
  try {
    const user = await createUser({
      name,
      email,
      password,
      phone,
      role,
      skills,
      location,
      available,
      language,
    });
    const token = await user.generateToken();
    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
      NewUser: user,
      JwtToken: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password!",
      });
    }
    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password!",
      });
    }
    const token = await user.generateToken();
    res.cookie("token", token);
    const { password: _, ...userData } = user.toObject();
    return res.status(200).json({
      success: true,
      message: "User LoggedIn Successfully!",
      user: userData,
      JwtToken: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
      error: error.message,
    });
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await allUsers();
    return res.status(200).json({
      success: true,
      message: "Users Fetched Successfully!",
      TotalUsers: users.length,
      AllUsers: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

export const getUserProfile = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Invalid user ID!",
    });
  }
  try {
    const user = await singleUser(id);
    return res.status(200).json({
      success: true,
      message: "Look At Your Profile!",
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

export const logOut = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      msg: "User Logged Out Successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
};
