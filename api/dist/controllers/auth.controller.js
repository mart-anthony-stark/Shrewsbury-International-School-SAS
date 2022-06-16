"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Admin_model_1 = __importDefault(require("../models/Admin.model"));
const token_1 = require("../utils/token");
const bcrypt = require("bcryptjs");
exports.default = {
    signup: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log(req.body);
        try {
            const user = new Admin_model_1.default(req.body);
            const salt = yield bcrypt.genSalt(10);
            user.password = yield bcrypt.hash(req.body.password, salt);
            yield user.save();
            const accessToken = (0, token_1.createToken)(user, `${process.env.ACCESS_SECRET}`, "30m");
            const refreshToken = (0, token_1.createToken)(user._id, `${process.env.REFRESH_SECRET}`, '7d');
            user._doc.password = undefined;
            res.status(200).send({
                user: user._doc,
                accessToken,
                refreshToken,
            });
        }
        catch (error) {
            let err = error.message;
            if (error.code === 11000) {
                err = "Email must be unique";
            }
            res.status(500).send({ err });
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const user = yield Admin_model_1.default.findOne({ email });
            if (!user)
                return res
                    .status(404)
                    .send({ success: false, msg: "Account not found" });
            const validPassword = yield bcrypt.compare(password, user.password);
            if (!validPassword)
                return res.status(401).send({ msg: "Incorrect password" });
            const accessToken = (0, token_1.createToken)(user, `${process.env.ACCESS_SECRET}`, '30m');
            const refreshToken = (0, token_1.createToken)(user._id, `${process.env.REFRESH_SECRET}`, '7d');
            user._doc.password = undefined;
            res
                .status(200)
                .send({ success: true, user: user._doc, accessToken, refreshToken });
        }
        catch (error) {
            res.status(500).send(error);
        }
    }),
};
