import express, { Application } from "express";
import init from "./utils/init";
import * as dotenv from "dotenv";
import authRouter from "./routes/auth.route";
import studentRouter from "./routes/student.route";
dotenv.config({});

const app: Application = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/student", studentRouter);
import timeRouter from "./routes/time.route";
app.use("/time", timeRouter);

init(app);

    import adminRouter from "./routes/admin.route";
    app.use("/admin", adminRouter);