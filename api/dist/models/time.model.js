"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const TimeSchema = new mongoose.Schema({
    student: {
        type: mongoose_1.Types.ObjectId,
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
}, { timestamps: true });
const model = mongoose.model("Time", TimeSchema);
exports.default = model;
