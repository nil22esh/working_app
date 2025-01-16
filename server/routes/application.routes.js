import express from "express";
import {
  deleteApplicationById,
  getApplicationById,
  getApplicationsByJob,
  getApplicationsByUser,
  postApplicationForJob,
  updateApplicationStatus,
} from "../controllers/application.controller.js";
import authUser from "../middlewares/authUser.middleware.js";
import checkAdmin from "../middlewares/isAdmin.middleware.js";
const applicationRouter = express.Router();

applicationRouter.post("/apply", authUser, postApplicationForJob);

applicationRouter.get(
  "/totalapplications/:id",
  authUser,
  checkAdmin,
  getApplicationsByJob
);

applicationRouter.get("/myapplications", authUser, getApplicationsByUser);

applicationRouter.get("/myapplication/:id", authUser, getApplicationById);

applicationRouter.put(
  "/updateApplication/:id",
  authUser,
  updateApplicationStatus
);

applicationRouter.delete(
  "/deleteApplication/:id",
  authUser,
  deleteApplicationById
);

export default applicationRouter;
