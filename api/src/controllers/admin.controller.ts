import { Request, Response } from "express";
import Admin from "../models/Admin.model";
const bcrypt = require("bcryptjs");

module.exports = {
  // GET ALL DATA
  getAll: async (req: Request, res: Response) => {
    const admins = await Admin.find().select("-password");
    res.send(admins);
  },
  // GET ONE DATA
  getOne: async (req: Request, res: Response) => {
    const admin = await Admin.findOne({ _id: req.params.id });
    res.send(admin);
  },
  // CREATE DATA
  createOne: async (req: Request, res: Response) => {
    try {
      const newAdmin = new Admin(req.body);
      await newAdmin.save();
      res.send(newAdmin);
    } catch (error: any) {
      console.log(error.message);
      let err = error.message;
      if (error.code === 11000) {
        err = "Email must be unique";
      }
      res.status(500).send({ err });
    }
  },
  // UPDATE DATA
  updateOne: async (req: Request, res: Response) => {
    if (req["body"]["password"]) {
      if (req.body.password.length < 8)
        return res
          .status(500)
          .send({ msg: "Password must be at least 8 characters long" });

      const salt = await bcrypt.genSalt(10);
      req["body"]["password"] = await bcrypt.hash(req.body.password, salt);
    }

    const admin = await Admin.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    res.send(admin);
  },
  // DELETE DATA
  deleteOne: async (req: Request, res: Response) => {
    const admin = await Admin.findByIdAndRemove(req.params.id);
    res.send(admin);
  },
};
