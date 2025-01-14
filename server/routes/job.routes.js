import express from "express";
import { body } from "express-validator";
import {
  deleteJobById,
  getAllJobs,
  getJobById,
  getUserJobs,
  postJob,
  updateJobById,
} from "../controllers/job.controller.js";
import authUser from "../middlewares/authUser.middleware.js";
import checkClient from "../middlewares/isClient.middleware.js";
import checkAdmin from "../middlewares/isAdmin.middleware.js";
const jobRouter = express.Router();

jobRouter.post(
  "/postnewjob",
  authUser,
  checkClient,
  [
    body("title")
      .isString()
      .notEmpty()
      .trim()
      .withMessage("Title is required."),
    body("description")
      .isString()
      .notEmpty()
      .trim()
      .withMessage("Description is required."),
    body("location")
      .isString()
      .notEmpty()
      .trim()
      .withMessage("Location is required."),
    body("skillsrequired")
      .isArray()
      .notEmpty()
      .withMessage("Skillsrequired is required."),
    body("urgency")
      .isIn(["urgent", "high", "medium", "low"])
      .withMessage("Invalid urgency."),
    body("duration")
      .matches(/^[0-9]+ (hours|days|weeks|months)$/)
      .withMessage("Invalid duration format."),
    body("payrate")
      .matches(/^\d+(.\d{1,2})?\s?[a-zA-Z]+$/)
      .withMessage("Invalid pay rate format."),
    body("status")
      .isIn(["open", "closed", "in-progress"])
      .withMessage("Invalid status."),
    body("startDate").isISO8601().withMessage("Invalid start date."),
    body("endDate").isISO8601().withMessage("Invalid end date."),
  ],
  postJob
);

jobRouter.get("/alljobs", authUser, checkAdmin, getAllJobs);

jobRouter.get("/myjobs", authUser, checkClient, getUserJobs);

jobRouter.get("/myjob/:id", authUser, checkClient, getJobById);

jobRouter.put("/myjob/:id", authUser, checkClient, updateJobById);

jobRouter.delete("/myjob/:id", authUser, checkClient, deleteJobById);

export default jobRouter;
