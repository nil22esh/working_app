import express from "express";
import { body } from "express-validator";
import {
  getAllUsers,
  getUserProfile,
  login,
  logOut,
  register,
} from "../controllers/user.controller.js";
import authUser from "../middlewares/authUser.middleware.js";
import checkAdmin from "../middlewares/isAdmin.middleware.js";

const userRouter = express.Router();

userRouter.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Please enter your name!"),
    body("email").notEmpty().withMessage("Please enter your email!"),
    body("phone")
      .notEmpty()
      .withMessage("Please enter your phone number")
      .isLength({ min: 10, max: 10 })
      .withMessage("Please enter a valid phone number with 10 digits!"),
    body("password")
      .notEmpty()
      .withMessage("Please enter your password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters!"),
  ],
  register
);

userRouter.post(
  "/login",
  [
    body("email").notEmpty().withMessage("Please enter your email"),
    body("password")
      .notEmpty()
      .withMessage("Please enter your password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters!"),
  ],
  login
);

userRouter.get("/getallusers", authUser, checkAdmin, getAllUsers);

userRouter.get("/myprofile/:id", authUser, getUserProfile);

userRouter.get("/logout", authUser, logOut);

export default userRouter;
