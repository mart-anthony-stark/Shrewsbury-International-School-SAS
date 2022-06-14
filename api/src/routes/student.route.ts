
const router = require("express").Router();
const studentController = require("../controllers/student.controller");

router.get("/student", studentController.getAll);
router.get("/student/:id", studentController.getOne);
router.post("/student", studentController.createOne);
router.put("/student/:id", studentController.updateOne);
router.delete("/student/:id", studentController.deleteOne);

module.exports = router;