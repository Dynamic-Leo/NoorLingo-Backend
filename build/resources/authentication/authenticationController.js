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
const authenticationValidator_1 = __importDefault(require("./authenticationValidator"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const responseCodes_1 = __importDefault(require("../../utils/responseCodes"));
const usersServices_1 = __importDefault(require("../users/usersServices"));
const passwordHash_1 = __importDefault(require("../../utils/passwordHash"));
const jwtServices_1 = __importDefault(require("../../utils/jwtServices"));
const authenticationController = {
    login: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { error } = authenticationValidator_1.default.login.validate(req.body);
        if (error) {
            return yield (0, sendResponse_1.default)(res, responseCodes_1.default.BAD, error.details[0].message.replace(/"/g, ""), null, null);
        }
        const { email, password } = req.body;
        const user = yield usersServices_1.default.getByEmail(email);
        if (!user) {
            return yield (0, sendResponse_1.default)(res, responseCodes_1.default.NOT_AUTHORIZED, "Invalid email or password", null, null);
        }
        const isValidPassword = yield passwordHash_1.default.validatePassword(password, user.password);
        if (!isValidPassword) {
            return yield (0, sendResponse_1.default)(res, responseCodes_1.default.NOT_AUTHORIZED, "Invalid email or password", null, null);
        }
        const accessToken = yield jwtServices_1.default.create({ userId: user.id });
        // Remove password from response
        const userData = Object.assign(Object.assign({}, user), { accessToken });
        delete userData.password;
        // const userData = JSON.parse(JSON.stringify(user));
        // delete userData.password;
        userData.accessToken = accessToken;
        return yield (0, sendResponse_1.default)(res, responseCodes_1.default.OK, "Logged in", { id: user.id, name: user.name, accessToken }, null);
    })),
};
exports.default = authenticationController;
