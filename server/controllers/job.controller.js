import {
  allJobs,
  createNewJob,
  deleteJob,
  getJob,
  myJobs,
  updateJob,
} from "../repository/job.repository.js";

export const postJob = async (req, res, next) => {
  const {
    title,
    description,
    skillsrequired,
    urgency,
    duration,
    payrate,
    location,
    status,
    startDate,
    endDate,
  } = req.body;
  const userId = req.user._id;
  try {
    const job = await createNewJob({
      title,
      description,
      skillsrequired,
      urgency,
      duration,
      payrate,
      location,
      userId,
      status,
      startDate,
      endDate,
    });
    return res.status(201).json({
      success: true,
      message: "New job posted successfully!",
      NewJob: job,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to post new job!",
      error: error.message,
    });
  }
};

export const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await allJobs();
    return res.status(200).json({
      success: true,
      message: "All jobs fetched successfully!",
      TotalJobs: jobs.length,
      AllJobs: jobs,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to fetch all jobs!",
      error: error.message,
    });
  }
};

export const getUserJobs = async (req, res, next) => {
  const userId = req.user._id.toString();
  try {
    const jobs = await myJobs(userId);
    return res.status(200).json({
      success: true,
      message: "User's jobs fetched successfully!",
      TotalJobs: jobs.length,
      UserJobs: jobs,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to fetch user's jobs!",
      error: error.message,
    });
  }
};

export const getJobById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const job = await getJob(id);
    return res.status(200).json({
      success: true,
      message: "Job fetched successfully!",
      Job: job,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to fetch job by id!",
      error: error.message,
    });
  }
};

export const updateJobById = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updatedJob = await updateJob(id, data);
    return res.status(200).json({
      success: true,
      message: "Job updated successfully!",
      UpdatedJob: updatedJob,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to update job by id!",
      error: error.message,
    });
  }
};

export const deleteJobById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedJob = await deleteJob(id);
    return res.status(200).json({
      success: true,
      message: "Job deleted successfully!",
      DeletedJob: deletedJob,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to delete job by id!",
      error: error.message,
    });
  }
};
