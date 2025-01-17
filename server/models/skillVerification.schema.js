import mongoose from "mongoose";

const skillVerificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    skill: {
      type: String,
      required: true,
      trim: true,
    },
    verificationMethod: {
      type: String,
      required: true,
      enum: ["certificate", "test", "reference", "other"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "passed", "failed"],
      default: "pending",
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    dateVerified: {
      type: Date,
    },
    rejectionReason: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const SkillVerification = mongoose.model(
  "SkillVerification",
  skillVerificationSchema
);
export default SkillVerification;
