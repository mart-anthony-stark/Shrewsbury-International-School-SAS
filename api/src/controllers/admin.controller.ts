import { Request, Response } from "express";
  import Admin from "../models/Admin.model";
  
  module.exports = {
    // GET ALL DATA
    getAll: async (req:Request, res:Response) => {
      const admins = await Admin.find();
      res.send(admins);
    },
    // GET ONE DATA
    getOne: async (req:Request, res:Response) => {
      const admin = await Admin.findOne({ _id: req.params.id });
      res.send(admin)
    },
    // CREATE DATA
    createOne: async (req:Request,res:Response) => {
      const newAdmin = new Admin(req.body)
      await newAdmin.save()
      res.send(newAdmin)
    },
    // UPDATE DATA
    updateOne: async (req:Request, res:Response) => {
      const admin = await Admin.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      );
  
      res.send(admin)
    },
    // DELETE DATA
    deleteOne: async (req:Request, res:Response) => {
      const admin = await Admin.findByIdAndRemove(req.params.id);
      res.send(admin);
    },
  };
  