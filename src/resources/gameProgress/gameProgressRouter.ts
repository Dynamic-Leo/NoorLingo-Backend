import express from "express";
import gameProgressController from "./gameProgressController";

const router = express.Router();

router.post("/upsert", gameProgressController.upsertProgress);
router.get("/get/:childId", gameProgressController.getChildProgress);

export default router;
