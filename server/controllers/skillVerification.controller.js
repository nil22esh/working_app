import SkillVerification from "../models/skillVerification.schema.js";
import { skillVerificationRequestEmail } from "../Emails/skillVerificationEmail.js";

export const requestSkillVerification = async (req, res, next) => {
  const { skill, verificationMethod } = req.body;
  const userId = req.user._id;
  try {
    const skillVerification = await SkillVerification.create({
      skill,
      userId,
      verificationMethod,
    });
    skillVerificationRequestEmail(req.user);
    return res.status(200).json({
      success: true,
      message: "Skill verification request sent successfully",
      data: skillVerification,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error while requesting skill verification",
      error: error.stack,
    });
  }
};

export const verifySkill = async (req, res, next) => {
  const { id } = req.params;
  const { status, verifiedBy, rejectionReason } = req.body;
  try {
    const skillVerification = await SkillVerification.findByIdAndUpdate(
      id,
      {
        status,
        verifiedBy,
        dateVerified: status === "passed" ? new Date() : null,
        rejectionReason: status === "failed" ? rejectionReason : null,
      },
      { new: true }
    );
    if (!skillVerification) {
      return res.status(404).json({
        success: false,
        message: "Skill verification not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Skill verification updated successfully",
      data: skillVerification,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error while verifying skill verification",
      error: error.stack,
    });
  }
};

export const getSkillVerificationStatus = async (req, res, next) => {
  const { id } = req.params;
  try {
    const skillVerification = await SkillVerification.findById(id);
    if (!skillVerification) {
      return res.status(404).json({
        success: false,
        message: "Skill verification not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Skill verification status retrieved successfully",
      data: skillVerification.status,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error while retrieving skill verification status",
      error: error.stack,
    });
  }
};

export const getAllSkillVerifications = async (req, res, next) => {
  try {
    const verifications = await SkillVerification.find().populate("userId");
    return res.status(200).json({
      success: true,
      message: "All skill verifications retrieved successfully",
      TotalCount: verifications.length,
      data: verifications,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error while retrieving all skill verifications",
      error: error.stack,
    });
  }
};

export const deleteSkillVerification = async (req, res, next) => {
  const { id } = req.params;
  try {
    const skillVerification = await SkillVerification.findByIdAndDelete(id);
    if (!skillVerification) {
      return res
        .status(404)
        .json({ success: false, message: "Verification not found" });
    }
    res.status(200).json({
      success: true,
      message: "Skill verification deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error while deleting skill verification",
      error: error.message,
    });
  }
};
