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
exports.CustomError = void 0;
const appError_1 = __importDefault(require("../utils/appError"));
const typeorm_1 = require("typeorm");
const EntityMetadataNotFoundError_1 = require("typeorm/error/EntityMetadataNotFoundError");
const class_validator_1 = require("class-validator");
class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.default = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("ERR CAUGHT IN GLOBAL MIDDLEWARE");
    console.error("ERROR =>", err);
    console.error("ERROR MESSAGE =>", err.message);
    console.error("ERROR NAME =>", err.name);
    console.error("ERROR CODE =>", err.code);
    console.error("ERROR STACK =>", err.stack);
    const handleDuplicateFieldsDB = (err) => {
        if (err.detail) {
            const field = err.detail.match(/\((.*?)\)/)[1];
            const errorKey = field;
            return new appError_1.default(`${errorKey} already exists`, 400, true);
        }
        return new appError_1.default(err, 400, true);
    };
    const invalidForeignKey = (err) => {
        if (err.detail) {
            const field = err.detail.match(/\((.*?)\)/)[1];
            const errorKey = field;
            return new appError_1.default(`${errorKey} not found`, 400, true);
        }
        return new appError_1.default(err, 
        //'Invalid foreign key error',
        400, true);
    };
    const checkNull = (err) => {
        if (err.detail) {
            const field = err.detail.match(/\((.*?)\)/)[1];
            const errorKey = field;
            return new appError_1.default(`${errorKey} cannot be null`, 400, true);
        }
        return new appError_1.default(err, 
        //'Null value error',
        400, true);
    };
    class DatabaseError extends Error {
        constructor(message) {
            super(message);
            this.name = "DatabaseError";
        }
    }
    const invalidInput = (err) => {
        const invalidValueMatch = err.message.match(/invalid input syntax for type (\w+): "(.*)"/);
        const invalidType = invalidValueMatch ? invalidValueMatch[1] : "unknown";
        const invalidValue = invalidValueMatch ? invalidValueMatch[2] : "unknown";
        let errorMessage;
        switch (invalidType.toLowerCase()) {
            case "uuid":
                errorMessage = `Invalid UUID provided: ${invalidValue}`;
                break;
            case "integer":
            case "int":
            case "number":
                errorMessage = `Invalid number provided: ${invalidValue}`;
                break;
            case "date":
            case "datetime":
            case "timestamp":
                errorMessage = `Invalid date provided: ${invalidValue}`;
                break;
            default:
                errorMessage = `Invalid ${invalidType} value provided: ${invalidValue}`;
                break;
        }
        return new appError_1.default(errorMessage, 400, true);
    };
    const handleValidationError = (err) => {
        const errors = Object.values(err.errors).map((val) => val.message);
        return new appError_1.default(errors[0], 400, true);
    };
    // if (err instanceof ValidationError) {
    //     err = handleValidationError(err);
    //   }
    const handleError = (err) => {
        return new appError_1.default(err.message, 400, true);
    };
    // Default error object to return
    const errorResponse = {
        message: "Internal Server Error",
    };
    //  if (err.name === 'ValidationError') {
    //     // TypeORM validation error
    //     const validationErrors = Object.values(err.errors).map((val: any) => val.message);
    //     err=new AppError( validationErrors ,400,true);
    //   }else
    if (err instanceof EntityMetadataNotFoundError_1.EntityMetadataNotFoundError) {
        console.error("Metadata not found for entity:", err.message);
        err = new appError_1.default("Entity metadata not found", 400, true);
    }
    else if (err instanceof typeorm_1.QueryFailedError) {
        // if (err.message.includes('column')) {
        err = handleDuplicateFieldsDB(err);
        // } else {
        //   err = new AppError(`${errorKey} already exists`, 400, true);
        // }
    }
    else if (err.code === "23505") {
        err = handleDuplicateFieldsDB(err);
    }
    else if (err.code === "23503") {
        err = invalidForeignKey(err);
    }
    else if (err.code === "23502") {
        err = checkNull(err);
    }
    else if (err.code === "22P02") {
        err = invalidInput(err);
    }
    else if (err.name === "Error") {
        err = handleError(err);
    }
    else if (err.message === "Request failed with status code 401") {
        console.error("Request failed with status code 401");
        err = new appError_1.default("Unauthorized", 401, true);
    }
    else if (err.message === "Request failed with status code 400") {
        console.error("Request failed with status code 400");
        err = new appError_1.default("Request Failed", 400, true);
    }
    else if (err.message === "Request failed with status code 500") {
        console.error("Request failed with status code 500");
        err = new appError_1.default("Internal Server Error", 500, true);
    }
    else if (err.name === "UpdateValuesMissingError") {
        console.error("UpdateValuesMissingError: Cannot perform update query because update values are not defined");
        err = new appError_1.default("Cannot perform update query because update values are not defined", 400, true);
    }
    else if (err instanceof CustomError) {
        // Handle specific error types if needed
        errorResponse.message = err.message;
        err = new appError_1.default(errorResponse.message, 500, true);
        // You can also set a specific status code for this type of error if needed
        // res.status(400);
    }
    else if (err instanceof DatabaseError) {
        // Handle database-specific errors
        console.error("Database error:", err);
        err = new appError_1.default("Database operation failed.", 500, true);
    }
    else if (err.name === "QueryFailedError" ||
        err.name === "EntityNotFoundError") {
        // Handle TypeORM database errors (you can add more specific error checks if needed)
        errorResponse.message = "Database Error";
        err = new appError_1.default(errorResponse.message, 500, true);
        // You can also set a specific status code for database errors if needed
        // res.status(500);
    }
    else if (err instanceof ApiError) {
        // Handle custom AppError (e.g., validation errors, business logic errors)
        err = new appError_1.default(err.message, err.statusCode);
    }
    else if (err.isAxiosError) {
        // Handle AxiosError (e.g., HTTP request errors)
        const axiosError = err;
        err = new appError_1.default("Request failed.", ((_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.status) || 500);
    }
    else if (err instanceof class_validator_1.ValidationError) {
        err = handleValidationError(err);
    }
    else {
        err = new appError_1.default(err.message, err.statusCode, false);
    }
    const responsePayload = {
        status: "error",
        message: err.message,
    };
    // if (process.env.NODE_ENV === 'development') {
    //   responsePayload['stack'] = err.stack;
    // }
    return res.status(err.statusCode).json(responsePayload);
});
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = "CustomError";
    }
}
exports.CustomError = CustomError;
