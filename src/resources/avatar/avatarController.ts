// src/modules/avatar/avatarController.ts
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import responseCodes from "../../utils/responseCodes";
import avatarService from "./avatarService";

const avatarController = {
  getAll: catchAsync(async (req: Request, res: Response) => {
    const avatars = await avatarService.getAll();
    return sendResponse(res, responseCodes.OK, "Avatars fetched", avatars, null);
  }),
};

export default avatarController;
