import { Router } from "express";
import { catcher } from "../utils/catcher";
const timeController = require("../controllers/time.controller");
const router = Router();

router.get("/", catcher(timeController.getAll));
router.get("/:id", catcher(timeController.getOne));
router.post("/", catcher(timeController.createOne));
router.put("/:id", catcher(timeController.updateOne));
router.delete("/:id", catcher(timeController.deleteOne));

export default router;
