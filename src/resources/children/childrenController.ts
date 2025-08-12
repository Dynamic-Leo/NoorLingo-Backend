import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import responseCodes from "../../utils/responseCodes";
import childrenService from "./childrenServices";
import childrenValidator from "./childrenValidator";

const childrenController = {
  create: catchAsync(async (req: Request, res: Response) => {
    const { error } = childrenValidator.create.validate(req.body);
    if (error) {
      return await sendResponse(
        res,
        responseCodes.BAD,
        error.details[0].message.replace(/"/g, ""),
        null,
        null
      );
    }

    const child = await childrenService.create(req.body);
    if (child) {
      return await sendResponse(
        res,
        responseCodes.CREATED,
        "Child added successfully",
        child,
        null
      );
    }

    return await sendResponse(
      res,
      responseCodes.BAD,
      "Failed to add child",
      null,
      null
    );
  }),

  getByUser: catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const children = await childrenService.getByUserId(parseInt(userId));
    return await sendResponse(
      res,
      responseCodes.OK,
      "Children fetched",
      children,
      null
    );
  }),

  getById: catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const child = await childrenService.getById(parseInt(id));
  if (!child) {
    return sendResponse(res, responseCodes.NOT_FOUND, "Child not found", null, null);
  }

  return sendResponse(res, responseCodes.OK, "Child details fetched", child, null);
}),


};

export default childrenController;
