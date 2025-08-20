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
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, statusCode, message, data, logId) => __awaiter(void 0, void 0, void 0, function* () {
    if (data) {
        // await apiLogServices.updateResponse(logId, message, data, statusCode);
        res.status(statusCode || 200).send({ message, data });
    }
    else {
        res.status(statusCode || 200).send({ message });
    }
});
exports.default = sendResponse;
