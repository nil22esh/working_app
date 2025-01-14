import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name!"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please enter your email!"],
    },
    phone: {
      type: String,
      required: [true, "Please enter your phone number!"],
      unique: true,
      minlength: [10, "Please enter a valid 10-digit phone number!"],
      maxlength: [10, "Please enter a valid 10-digit phone number!"],
    },
    password: {
      type: String,
      select: false,
      required: [true, "Please enter your password!"],
      minlength: [8, "Password must be at least 8 characters!"],
    },
    role: {
      type: String,
      enum: ["worker", "admin", "client"],
      default: "worker",
    },
    skills: {
      type: [String],
      enum: [
        "chef",
        "driver",
        "plumber",
        "maid",
        "gardener",
        "waiter",
        "secretary",
        "teacher",
        "nurse",
        "receptionist",
        "housekeeping",
        "delivery",
        "cleaning",
        "laundry",
        "recycling",
        "recycling",
        "event management",
      ],
      default: [],
    },
    location: {
      type: {
        type: String,
      },
    },
    available: {
      type: Boolean,
      default: false,
    },
    language: {
      type: [String],
      enum: [
        "English",
        "Hindi",
        "Marathi",
        "Bengali",
        "Telugu",
        "Tamil",
        "Spanish",
        "French",
        "German",
        "Chinese",
      ],
      default: ["Hindi"],
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
).pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = async function () {
  return await jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const User = mongoose.model("User", userSchema);
export default User;
