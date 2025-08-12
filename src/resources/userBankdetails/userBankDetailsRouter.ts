import express from "express";
import userBankDetailsController from "./userBankDetailsController";

const router = express.Router();

router.post("/create", userBankDetailsController.create);
router.get("/all", userBankDetailsController.getAll);
router.get("/user/:userId", userBankDetailsController.getByUserId);

export default router;
