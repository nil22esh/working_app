import express from "express";
import {
  deleteSkillVerification,
  getAllSkillVerifications,
  getSkillVerificationStatus,
  requestSkillVerification,
  verifySkill,
} from "../controllers/skillVerification.controller.js";
import authUser from "../middlewares/authUser.middleware.js";
import checkAdmin from "../middlewares/isAdmin.middleware.js";
const skillVerificationRouter = express.Router();

skillVerificationRouter.post(
  "/requestverify",
  authUser,
  requestSkillVerification
);

skillVerificationRouter.get(
  "/skillverification/status/:id",
  authUser,
  getSkillVerificationStatus
);

skillVerificationRouter.get(
  "/allskills",
  authUser,
  checkAdmin,
  getAllSkillVerifications
);

skillVerificationRouter.put(
  "/verifyskill/:id",
  authUser,
  checkAdmin,
  verifySkill
);

skillVerificationRouter.delete(
  "/deleteskill/:id",
  authUser,
  checkAdmin,
  deleteSkillVerification
);

export default skillVerificationRouter;
