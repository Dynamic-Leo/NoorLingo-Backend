import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import User from "../entities/Users";
import { getRepository } from "typeorm";
import jwtServices from "../utils/jwtServices";
import AppDataSource from "../db";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}

export default catchAsync(async (req, res, next) => {
  if (
    req.url.startsWith("/files") ||
    req.url.startsWith("/videos") ||
    req.url.startsWith("/images") ||
    req.url.startsWith("/logs") ||
    req.url.endsWith("refreshToken") ||
    req.url.endsWith("login") ||
    req.url.endsWith("signup") || 
    req.url.startsWith("/api/v1/test") ||
    req.url.endsWith("/bvs/verify") ||
    req.url.endsWith("/bvs/callback")
  ) {
    return next();
  }

  let token: string | undefined;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You are not logged in", 401, true));
  }

  const payload = await jwtServices.authenticate(token);
  if (!payload) {
    return res.status(401).send({ message: "Invalid Token!" });
  }

  // ✅ get repository here, after DB connection is ready
  const userRepo = AppDataSource.getRepository(User);
  const currentUser = await userRepo.findOne({
    where: { id: payload.userId },
  });

  if (!currentUser) {
    return next(new AppError("User belonging to this token does not exist", 401, true));
  }

  req.user = currentUser;
  next();
});

