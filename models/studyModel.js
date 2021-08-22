const mongoose = require("mongoose");

//Study Schema
const studySchema = mongoose.Schema(
  {
    assignment: {
      type: String,
      required: [true, "Name of assignment is required"],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
    },
    minutes: {
      type: Number,
      min: 0,
      required: [true, "Time in minutes is required"],
    },
    notes: {
      type: String,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Study = mongoose.model("Study", studySchema);

module.exports = Study;
