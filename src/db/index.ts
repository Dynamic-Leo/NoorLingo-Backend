// src/db/index.ts

import "reflect-metadata";
require("dotenv").config();
import { DataSource } from "typeorm";
import path from "path"; // 👈 Import the 'path' module

// Remove direct entity imports as they are no longer needed here
// import Users from "../entities/Users";
// import Children from "../entities/Children";
// import GameProgress from "../entities/GameProgress";

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  
  entities: [
    path.join(__dirname, '/../entities/*.{js,ts}')
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

export default AppDataSource;