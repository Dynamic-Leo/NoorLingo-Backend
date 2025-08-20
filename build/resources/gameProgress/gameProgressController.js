"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gameProgressServices_1 = __importDefault(require("./gameProgressServices"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const responseCodes_1 = __importDefault(require("../../utils/responseCodes"));
const gameProgressValidator_1 = __importDefault(require("./gameProgressValidator"));
const gameProgressController = {
    upsertProgress: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { error } = gameProgressValidator_1.default.upsert.validate(req.body);
        if (error) {
            return (0, sendResponse_1.default)(res, responseCodes_1.default.BAD, error.details[0].message.replace(/"/g, ""), null, null);
        }
        const result = yield gameProgressServices_1.default.createOrUpdate(req.body);
        return (0, sendResponse_1.default)(res, responseCodes_1.default.OK, "Progress updated", result, null);
    })),
    getChildProgress: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const childId = parseInt(req.params.childId);
        const progress = yield gameProgressServices_1.default.getByChild(childId);
        return (0, sendResponse_1.default)(res, responseCodes_1.default.OK, "Progress fetched", progress, null);
    })),
};
exports.default = gameProgressController;
