import { Request, Response } from "express";
import Time from "../models/time.model";

module.exports = {
  // GET ALL DATA
  getAll: async (req: Request, res: Response) => {
    const times = await Time.find().populate("student");
    res.send(times);
  },
  // GET ONE DATA
  getOne: async (req: Request, res: Response) => {
    const time = await Time.findOne({ _id: req.params.id });
    res.send(time);
  },
  // CREATE DATA
  createOne: async (req: Request, res: Response) => {
    const newTime = new Time(req.body);
    await newTime.save();
    res.send(newTime);
  },
  // UPDATE DATA
  updateOne: async (req: Request, res: Response) => {
    const time = await Time.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    res.send(time);
  },
  // DELETE DATA
  deleteOne: async (req: Request, res: Response) => {
    const time = await Time.findByIdAndRemove(req.params.id);
    res.send(time);
  },
};
