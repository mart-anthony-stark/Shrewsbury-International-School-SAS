import { Router } from "express";
const studentController = require("../controllers/student.controller");
const router = Router();

router.get("/", studentController.getAll);
router.get("/:id", studentController.getOne);
router.post("/", studentController.createOne);
router.put("/:id", studentController.updateOne);
router.delete("/:id", studentController.deleteOne);

export default router;
