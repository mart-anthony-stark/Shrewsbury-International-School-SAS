import express, { Application } from "express";
import init from "./utils/init";
import * as dotenv from "dotenv";
import authRouter from "./routes/auth.route";
import studentRouter from "./routes/student.route";
dotenv.config({});
const cors = require("cors");

const app: Application = express();
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

import adminRouter from "./routes/admin.route";
app.use("/admin", adminRouter);
app.use("/auth", authRouter);
app.use("/student", studentRouter);
import timeRouter from "./routes/time.route";
app.use("/time", timeRouter);

init(app);

