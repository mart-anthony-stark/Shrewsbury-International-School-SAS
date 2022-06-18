"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const init_1 = __importDefault(require("./utils/init"));
const dotenv = __importStar(require("dotenv"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const student_route_1 = __importDefault(require("./routes/student.route"));
dotenv.config({});
const cors = require("cors");
const app = (0, express_1.default)();
app.use(cors({ origin: "*" }));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
const admin_route_1 = __importDefault(require("./routes/admin.route"));
app.use("/admin", admin_route_1.default);
app.use("/auth", auth_route_1.default);
app.use("/student", student_route_1.default);
const time_route_1 = __importDefault(require("./routes/time.route"));
app.use("/time", time_route_1.default);
(0, init_1.default)(app);
