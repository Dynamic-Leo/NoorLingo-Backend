"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gameProgressController_1 = __importDefault(require("./gameProgressController"));
const router = express_1.default.Router();
router.post("/upsert", gameProgressController_1.default.upsertProgress);
router.get("/get/:childId", gameProgressController_1.default.getChildProgress);
exports.default = router;
