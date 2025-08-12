import "reflect-metadata";
require("dotenv").config();
import { DataSource } from "typeorm";
import Users from "../entities/Users";
import UserBankDetails from "../entities/BankDetails";
import Children from "../entities/Children";
import GameProgress from "../entities/GameProgress";

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    Users,
    UserBankDetails,
    Children,
    GameProgress
  ],
  synchronize: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

export default AppDataSource;
