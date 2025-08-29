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
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const responseCodes_1 = __importDefault(require("../../utils/responseCodes"));
const childrenServices_1 = __importDefault(require("./childrenServices"));
const childrenValidator_1 = __importDefault(require("./childrenValidator"));
const childrenController = {
    create: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { error } = childrenValidator_1.default.create.validate(req.body);
        if (error) {
            return yield (0, sendResponse_1.default)(res, responseCodes_1.default.BAD, error.details[0].message.replace(/"/g, ""), null, null);
        }
        const child = yield childrenServices_1.default.create(req.body);
        if (child) {
            return yield (0, sendResponse_1.default)(res, responseCodes_1.default.CREATED, "Child added successfully", child, null);
        }
        return yield (0, sendResponse_1.default)(res, responseCodes_1.default.BAD, "Failed to add child", null, null);
    })),
    edit: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { error } = childrenValidator_1.default.edit.validate(req.body);
        if (error) {
            return yield (0, sendResponse_1.default)(res, responseCodes_1.default.BAD, error.details[0].message.replace(/"/g, ""), null, null);
        }
        const childId = parseInt(req.params.id);
        const updatedChild = yield childrenServices_1.default.edit(childId, req.body);
        return yield (0, sendResponse_1.default)(res, responseCodes_1.default.OK, "Child details updated successfully", updatedChild, null);
    })),
    getByUser: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.params;
        const children = yield childrenServices_1.default.getByUserId(parseInt(userId));
        return yield (0, sendResponse_1.default)(res, responseCodes_1.default.OK, "Children fetched", children, null);
    })),
    getById: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const child = yield childrenServices_1.default.getById(parseInt(id));
        if (!child) {
            return (0, sendResponse_1.default)(res, responseCodes_1.default.NOT_FOUND, "Child not found", null, null);
        }
        return (0, sendResponse_1.default)(res, responseCodes_1.default.OK, "Child details fetched", child, null);
    })),
    updateAvatar: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const { avatarId } = req.body;
        if (!avatarId) {
            return (0, sendResponse_1.default)(res, responseCodes_1.default.BAD, "avatarId is required", null, null);
        }
        const child = yield childrenServices_1.default.updateAvatar(parseInt(id), avatarId);
        return (0, sendResponse_1.default)(res, responseCodes_1.default.OK, "Avatar updated successfully", child, null);
    })),
};
exports.default = childrenController;
