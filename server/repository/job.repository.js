import mongoose from "mongoose";
import Job from "../models/job.schema.js";

export const createNewJob = async ({
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
}) => {
  if (
    !title ||
    !description ||
    !skillsrequired ||
    !urgency ||
    !duration ||
    !payrate ||
    !location ||
    !userId ||
    !status ||
    !startDate ||
    !endDate
  ) {
    throw new Error("All fields are required");
  }
  try {
    const newJob = await Job.create({
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
    return newJob;
  } catch (error) {
    throw new Error(`Failed to create job: ${error.message}`);
  }
};

export const allJobs = async () => {
  try {
    const allJobs = await Job.find();
    return allJobs;
  } catch (error) {
    throw new Error(`Failed to fetch all jobs: ${error.message}`);
  }
};

export const myJobs = async (userId) => {
  if (!userId) {
    throw new Error(`User Not Found!`);
  }
  try {
    const jobs = await Job.find({
      userId: new mongoose.Types.ObjectId(userId),
    });
    if (jobs.length === 0) {
      throw new Error(`Your Jobs Not Found!`);
    }
    return jobs;
  } catch (error) {
    throw new Error(`Failed to fetch jobs:${error.message}`);
  }
};

export const getJob = async (jobId) => {
  if (!jobId) {
    throw new Error(`Job Not Found!`);
  }
  try {
    const job = await Job.findById(jobId);
    if (!job) {
      throw new Error(`Job Not Found!`);
    }
    return job;
  } catch (error) {
    throw new Error(`Failed to fetch job: ${error.message}`);
  }
};

export const updateJob = async (jobId, updatedData) => {
  if (!jobId) {
    throw new Error(`Job Not Found!`);
  }
  try {
    const job = await Job.findByIdAndUpdate(jobId, updatedData, { new: true });
    if (!job) {
      throw new Error(`Job Not Found!`);
    }
    return job;
  } catch (error) {
    throw new Error(`Failed to update job: ${error.message}`);
  }
};

export const deleteJob = async (jobId) => {
  if (!jobId) {
    throw new Error(`Job Not Found!`);
  }
  try {
    const job = await Job.findByIdAndDelete(jobId);
    if (!job) {
      throw new Error(`Job Not Found!`);
    }
    return job;
  } catch (error) {
    throw new Error(`Failed to delete job: ${error.message}`);
  }
};
