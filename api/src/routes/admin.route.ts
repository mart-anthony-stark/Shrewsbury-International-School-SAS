import { Router } from "express";
const adminController = require("../controllers/admin.controller");
const router = Router();
import { catcher } from "../utils/catcher";

router.get("/", adminController.getAll);
router.get("/:id", adminController.getOne);
router.post("/", adminController.createOne);
router.put("/:id", catcher(adminController.updateOne));
router.delete("/:id", adminController.deleteOne);

export default router;
