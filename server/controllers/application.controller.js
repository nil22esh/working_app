import Job from "../models/job.schema.js";
import {
  applicationsByUser,
  createApplication,
  deleteApplication,
  getApplication,
  getTotalApplications,
  getUpdatedApplication,
} from "../repository/application.repository.js";

export const postApplicationForJob = async (req, res, next) => {
  const { jobId, coverLetter } = req.body;
  const userId = req.user._id;
  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({
        success: false,
        message: "Invalid job id",
        error: error.message,
      });
    }
    const application = await createApplication({ userId, jobId, coverLetter });
    res.status(201).json({
      success: true,
      message: "Application created successfully",
      NewApplication: application,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error creating application for job",
      error: error.message,
    });
  }
};

export const getApplicationsByJob = async (req, res, next) => {
  const { id } = req.params;
  try {
    const applications = await getTotalApplications(id);
    res.status(200).json({
      success: true,
      message: "Applications retrieved successfully",
      TotalApplications: applications.length,
      Applications: applications,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error getting applications by job",
      error: error.message,
    });
  }
};

export const getApplicationsByUser = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const applications = await applicationsByUser(userId);
    res.status(200).json({
      success: true,
      message: "User applications retrieved successfully",
      TotalApplications: applications.length,
      Applications: applications,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error getting applications by user",
      error: error.message,
    });
  }
};

export const getApplicationById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const application = await getApplication(id);
    res.status(200).json({
      success: true,
      message: "Application retrieved successfully",
      Application: application,
    });
  } catch (error) {}
};

export const updateApplicationStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedApplication = await getUpdatedApplication(id, status);
    res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      UpdatedApplication: updatedApplication,
    });
  } catch (error) {}
};

export const deleteApplicationById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const application = await deleteApplication(id);
    return res.status(200).json({
      success: true,
      message: "Application deleted successfully",
      DeletedApplication: application,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error while deleting the application",
      error: error.message,
    });
  }
};
