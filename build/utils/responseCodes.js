"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseCodes = {
    OK: 200,
    CREATED: 201,
    BAD: 400,
    NOT_AUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
    TOO_MANY_REQUESTS: 429,
};
exports.default = responseCodes;
