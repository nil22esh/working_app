import mongoose from "mongoose";

const searchMatchSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    location: {
      type: String,
    },
    matchedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    matchedWorkers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const SearchMatch = mongoose.model("SearchMatch", searchMatchSchema);
export default SearchMatch;
