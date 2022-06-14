const mongoose = require("mongoose");
import { Types } from "mongoose";
  
  const TimeSchema = new mongoose.Schema(
      {
        student: {
          type: Types.ObjectId,
          ref: 'Student',
          required: true,
        },
        time: {
          type: String,
          required: true,
        },
        date: {
          type: String,
          required: true
        }
      },
      { timestamps: true }
    );
  
  const model = mongoose.model("Time", TimeSchema);
  export default model;