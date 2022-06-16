"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    middlename: {
        type: String,
    },
    lastname: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const model = mongoose.model("Student", StudentSchema);
exports.default = model;
