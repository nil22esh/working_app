import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    skillsrequired: {
      type: [String],
      enum: [
        "chef",
        "driver",
        "plumber",
        "maid",
        "gardener",
        "waiter",
        "secretary",
        "teacher",
        "nurse",
        "receptionist",
        "housekeeping",
        "delivery",
        "cleaning",
        "laundry",
        "recycling",
        "event management",
      ],
      required: true,
      default: ["housekeeping"],
    },
    urgency: {
      type: String,
      required: true,
      enum: ["urgent", "high", "medium", "low"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    duration: {
      type: String,
      required: true,
      validate: {
        validator: (value) => /^[0-9]+ (hours|days|weeks|months)$/.test(value),
        message: "Duration must be in the format: '10 days', '2 weeks', etc.",
      },
    },
    payrate: {
      type: String,
      required: true,
      validate: {
        validator: (value) => /^\d+(.\d{1,2})?\s?[a-zA-Z]+$/.test(value),
        message:
          "Pay rate must be numeric with a unit (e.g., '100 USD', '50 INR').",
      },
    },
    location: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "closed", "in-progress"],
      default: "open",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  { timestamps: true }
);

jobSchema.pre("save", function (next) {
  if (this.startDate > this.endDate) {
    throw new Error("Start date cannot be after end date!");
  }
  next();
});

const Job = mongoose.model("Job", jobSchema);
export default Job;
