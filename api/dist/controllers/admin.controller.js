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
const bcrypt = require("bcryptjs");
module.exports = {
    // GET ALL DATA
    getAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const admins = yield Admin_model_1.default.find().select("-password");
        res.send(admins);
    }),
    // GET ONE DATA
    getOne: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const admin = yield Admin_model_1.default.findOne({ _id: req.params.id });
        res.send(admin);
    }),
    // CREATE DATA
    createOne: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newAdmin = new Admin_model_1.default(req.body);
            yield newAdmin.save();
            res.send(newAdmin);
        }
        catch (error) {
            console.log(error.message);
            let err = error.message;
            if (error.code === 11000) {
                err = "Email must be unique";
            }
            res.status(500).send({ err });
        }
    }),
    // UPDATE DATA
    updateOne: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (req["body"]["password"]) {
            const salt = yield bcrypt.genSalt(10);
            req["body"]["password"] = yield bcrypt.hash(req.body.password, salt);
        }
        const admin = yield Admin_model_1.default.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
        res.send(admin);
    }),
    // DELETE DATA
    deleteOne: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const admin = yield Admin_model_1.default.findByIdAndRemove(req.params.id);
        res.send(admin);
    }),
};
