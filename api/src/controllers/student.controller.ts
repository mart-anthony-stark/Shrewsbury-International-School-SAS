import { Request, Response } from "express";
import Student from "../models/student.model";
import Time from "../models/time.model";

module.exports = {
  // GET ALL DATA
  getAll: async (req: Request, res: Response) => {
    const students = await Student.find();
    res.send(students);
  },
  // GET ONE DATA
  getOne: async (req: Request, res: Response) => {
    const student = await Student.findOne({ _id: req.params.id });
    res.send(student);
  },
  // CREATE DATA
  createOne: async (req: Request, res: Response) => {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.send(newStudent);
  },
  // UPDATE DATA
  updateOne: async (req: Request, res: Response) => {
    const student = await Student.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    res.send(student);
  },
  // DELETE DATA
  deleteOne: async (req: Request, res: Response) => {
    const student = await Student.findByIdAndRemove(req.params.id);
    res.send(student);
    deleteTime(student._id);
  },
};

const deleteTime = async (_id: string) => {
  Time.deleteMany({ student: _id }).then(() => {
    console.log("deleted");
  });
};
