import express from "express";
import authUser from "../middlewares/authUser.middleware.js";
import {
  getRecommendedJobs,
  getRecommendedWorkers,
  matchWorkerToJob,
  searchJobsBySkills,
  searchWorkerBySkill,
} from "../controllers/searchMatch.controller.js";

const searchMatchRouter = express.Router();

searchMatchRouter.post("/search/workers", authUser, searchWorkerBySkill);

searchMatchRouter.post("/search/jobs", authUser, searchJobsBySkills);

searchMatchRouter.post("/match/worker", authUser, matchWorkerToJob);

searchMatchRouter.get("/recommend/jobs", authUser, getRecommendedJobs);

searchMatchRouter.get(
  "/recommend/workers/:jobId",
  authUser,
  getRecommendedWorkers
);

export default searchMatchRouter;
