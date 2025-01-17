import Job from "../models/job.schema.js";
import User from "../models/user.schema.js";

export const searchWorkerBySkill = async (req, res, next) => {
  const { skills } = req.query;
  try {
    const users = await User.find({ skills: { $in: skills } });
    return res.status(200).json({
      success: true,
      message: "Workers found by skill.",
      TotalCount: users.length,
      data: users,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "An error occurred while searching for workers by skill.",
      error: error.message,
    });
  }
};

export const searchJobsBySkills = async (req, res, next) => {
  const { skills } = req.query;
  try {
    const jobs = await Job.find({ skillsrequired: { $in: skills } });
    return res.status(200).json({
      success: true,
      message: "Jobs found by skill.",
      TotalCount: jobs.length,
      data: jobs,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "An error occurred while searching for jobs by skill.",
      error: error.message,
    });
  }
};

export const matchWorkerToJob = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    console.log(user.skills);
    const jobs = await Job.find({
      skillsrequired: { $in: user.skills },
    });
    res.status(200).json({
      success: true,
      message: "Worker matched to jobs successfully!",
      TotalCount: jobs.length,
      matchedJobs: jobs,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getRecommendedJobs = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    const recommendedJobs = await Job.find({
      skillsrequired: { $in: user.skills },
    });
    res.status(200).json({
      success: true,
      message: "Recommended jobs fetched successfully!",
      TotalCount: recommendedJobs.length,
      Jobs: recommendedJobs,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getRecommendedWorkers = async (req, res, next) => {
  const { jobId } = req.params;
  try {
    const job = await Job.findById(jobId);
    const recommendedWorkers = await User.find({
      skills: { $in: job.skillsrequired },
    });
    res.status(200).json({
      success: true,
      message: "Recommended workers fetched successfully!",
      TotalCount: recommendedWorkers.length,
      recommendedWorkers,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
