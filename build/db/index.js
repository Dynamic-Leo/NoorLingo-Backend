"use strict";
// src/db/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv").config();
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path")); // 👈 Import the 'path' module
// Remove direct entity imports as they are no longer needed here
// import Users from "../entities/Users";
// import Children from "../entities/Children";
// import GameProgress from "../entities/GameProgress";
const AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
        path_1.default.join(__dirname, '/../entities/*.{js,ts}')
    ],
    synchronize: true, // Be cautious with synchronize: true in production
});
AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization", err);
});
exports.default = AppDataSource;
