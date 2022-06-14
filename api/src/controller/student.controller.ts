const Student = require("../models/student.model");

module.exports = {
  // GET ALL DATA
  getAll: async (req: any, res: any) => {
    const students = await Student.find();
    res.send(students);
  },
  // GET ONE DATA
  getOne: async (req: any, res: any) => {
    const student = await Student.findOne({ _id: req.params.id });
    res.send(student);
  },
  // CREATE DATA
  createOne: async (req: any, res: any) => {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.send(newStudent);
  },
  // UPDATE DATA
  updateOne: async (req: any, res: any) => {
    const student = await Student.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    res.send(student);
  },
  // DELETE DATA
  deleteOne: async (req: any, res: any) => {
    const student = await Student.findByIdAndRemove(req.params.id);
    res.send(student);
  },
};
