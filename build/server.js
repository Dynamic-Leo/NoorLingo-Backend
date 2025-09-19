"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
// import socketConnection from "./socket";
const PORT = Number(process.env.PORT);
const server = http_1.default.createServer(app_1.default);
// socketConnection(server);
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is runninggg on port ${PORT}`);
});
