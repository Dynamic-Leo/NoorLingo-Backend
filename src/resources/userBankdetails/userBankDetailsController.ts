import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import responseCodes from "../../utils/responseCodes";
import userBankDetailsValidator from "./userBankDetailsValidator";
import userBankDetailsServices from "./userBankDetailsService";

const userBankDetailsController = {
  create: catchAsync(async (req: Request, res: Response) => {
    const { error } = userBankDetailsValidator.create.validate(req.body);
    if (error) {
      return await sendResponse(
        res,
        responseCodes.BAD,
        error.details[0].message.replace(/"/g, ""),
        null,
        null
      );
    }

    const detail = await userBankDetailsServices.rcreate(req.body);
    if (detail) {
      return await sendResponse(
        res,
        responseCodes.CREATED,
        "Bank details saved",
        detail,
        null
      );
    }

    return await sendResponse(
      res,
      responseCodes.BAD,
      "Failed to save bank details",
      null,
      null
    );
  }),

  getAll: catchAsync(async (_req: Request, res: Response) => {
    const details = await userBankDetailsServices.getAll();
    return await sendResponse(
      res,
      responseCodes.OK,
      "Bank details fetched",
      details,
      null
    );
  }),

  getByUserId: catchAsync(async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const detail = await userBankDetailsServices.getByUserId(userId);

    if (detail) {
      return await sendResponse(
        res,
        responseCodes.OK,
        "Bank details found",
        detail,
        null
      );
    }

    return await sendResponse(
      res,
      responseCodes.NOT_FOUND,
      "Bank details not found",
      null,
      null
    );
  }),
};

export default userBankDetailsController;
