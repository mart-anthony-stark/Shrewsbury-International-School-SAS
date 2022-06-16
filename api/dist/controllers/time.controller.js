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
const time_model_1 = __importDefault(require("../models/time.model"));
module.exports = {
    // GET ALL DATA
    getAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const times = yield time_model_1.default.find();
        res.send(times);
    }),
    // GET ONE DATA
    getOne: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const time = yield time_model_1.default.findOne({ _id: req.params.id });
        res.send(time);
    }),
    // CREATE DATA
    createOne: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const newTime = new time_model_1.default(req.body);
        yield newTime.save();
        res.send(newTime);
    }),
    // UPDATE DATA
    updateOne: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const time = yield time_model_1.default.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
        res.send(time);
    }),
    // DELETE DATA
    deleteOne: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const time = yield time_model_1.default.findByIdAndRemove(req.params.id);
        res.send(time);
    }),
};
