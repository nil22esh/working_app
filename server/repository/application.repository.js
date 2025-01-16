import mongoose from "mongoose";
import Application from "../models/application.schema.js";

export const createApplication = async ({ userId, jobId, coverLetter }) => {
  try {
    const application = await Application.create({
      userId,
      jobId,
      coverLetter,
    });
    return application;
  } catch (error) {
    throw new Error(`Failed to create application: ${error.message}`);
  }
};

export const getTotalApplications = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid job ID");
  }
  try {
    const applications = await Application.find({ jobId: id }).populate(
      "userId"
    );
    if (applications.length == 0) {
      return "No Application Found For This JobId!";
    }
    return applications;
  } catch (error) {
    throw new Error(`Failed to get total applications: ${error.message}`);
  }
};

export const applicationsByUser = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID");
  }
  try {
    const applications = await Application.find({ userId }).populate("jobId");
    return applications;
  } catch (error) {
    throw new Error(`Failed to get applications by user: ${error.message}`);
  }
};

export const getApplication = async (id) => {
  if (!id) {
    throw new Error("Invalid application ID");
  }
  try {
    const application = await Application.findById(id);
    if (!application) {
      throw new Error("Application not found");
    }
    return application;
  } catch (error) {
    throw new Error(`Failed to get application: ${error.message}`);
  }
};

export const getUpdatedApplication = async (id, status) => {
  if (!id || !status) {
    throw new Error("Please fill all the required fields!");
  }
  try {
    const application = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!application) {
      throw new Error("Application not found");
    }
    return application;
  } catch (error) {
    throw new Error(`Failed to update application: ${error.message}`);
  }
};

export const deleteApplication = async (id) => {
  if (!id) {
    throw new Error("Invalid Application ID");
  }
  try {
    const application = await Application.findByIdAndDelete(id);
    if (!application) {
      throw new Error("Application not found");
    }
    return application;
  } catch (error) {
    throw new Error(`Failed to delete application: ${error.message}`);
  }
};
