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
const usersValidator_1 = __importDefault(require("./usersValidator"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const responseCodes_1 = __importDefault(require("../../utils/responseCodes"));
const passwordHash_1 = __importDefault(require("../../utils/passwordHash"));
const usersServices_1 = __importDefault(require("./usersServices"));
const usersController = {
    create: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { error } = usersValidator_1.default.create.validate(req.body);
        if (error) {
            return yield (0, sendResponse_1.default)(res, responseCodes_1.default.BAD, error.details[0].message.replace(/"/g, ""), null, null);
        }
        req.body.password = yield passwordHash_1.default.hash(req.body.password);
        const user = yield usersServices_1.default.create(req.body);
        if (user) {
            return yield (0, sendResponse_1.default)(res, responseCodes_1.default.CREATED, "User created successfully", null, null);
        }
        return yield (0, sendResponse_1.default)(res, responseCodes_1.default.BAD, "User not created", null, null);
    })),
    getAll: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const all = yield usersServices_1.default.getAll();
        if (all) {
            return yield (0, sendResponse_1.default)(res, responseCodes_1.default.OK, "User fetched", all, null);
        }
        else {
            return yield (0, sendResponse_1.default)(res, responseCodes_1.default.OK, "User not fetched", null, null);
        }
    })),
    getSingleWithChildren: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) {
            return yield (0, sendResponse_1.default)(res, responseCodes_1.default.BAD, "Invalid user ID", null, null);
        }
        const user = yield usersServices_1.default.getSingleWithChildren(userId);
        if (user) {
            return yield (0, sendResponse_1.default)(res, responseCodes_1.default.OK, "User with children fetched successfully", user, null);
        }
        else {
            return yield (0, sendResponse_1.default)(res, responseCodes_1.default.NOT_FOUND, "User not found", null, null);
        }
    })),
};
exports.default = usersController;
