import { Request, Response } from "express";
import gameProgressService from "./gameProgressServices";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import responseCodes from "../../utils/responseCodes";
import progressValidator from "./gameProgressValidator";

const gameProgressController = {
  upsertProgress: catchAsync(async (req: Request, res: Response) => {
    const { error } = progressValidator.upsert.validate(req.body);
    if (error) {
      return sendResponse(
        res,
        responseCodes.BAD,
        error.details[0].message.replace(/"/g, ""),
        null,
        null
      );
    }

    const result = await gameProgressService.createOrUpdate(req.body);
    return sendResponse(
      res,
      responseCodes.OK,
      "Progress updated",
      result,
      null
    );
  }),

  getChildProgress: catchAsync(async (req: Request, res: Response) => {
    const childId = parseInt(req.params.childId);
    const progress = await gameProgressService.getByChild(childId);
    return sendResponse(
      res,
      responseCodes.OK,
      "Progress fetched",
      progress,
      null
    );
  }),
};

export default gameProgressController;