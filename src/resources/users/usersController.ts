import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import usersValidator from "./usersValidator";
import sendResponse from "../../utils/sendResponse";
import responseCodes from "../../utils/responseCodes";
import passwordHash from "../../utils/passwordHash";
import usersServices from "./usersServices";

const usersController = {
  create: catchAsync(async (req: Request, res: Response) => {
    const { error } = usersValidator.create.validate(req.body);
    if (error) {
      return await sendResponse(
        res,
        responseCodes.BAD,
        error.details[0].message.replace(/"/g, ""),
        null,
        null
      );
    }

    req.body.password = await passwordHash.hash(req.body.password);
    const user = await usersServices.create(req.body);
    if (user) {
      return await sendResponse(
        res,
        responseCodes.CREATED,
        "User created successfully",
        null,
        null
      );
    }
    return await sendResponse(
      res,
      responseCodes.BAD,
      "User not created",
      null,
      null
    );
  }),
  getAll :catchAsync(async(req:Request,res:Response)=>{

    const all = await usersServices.getAll();
    if(all){
      return await sendResponse(
        res,
      responseCodes.OK,
      "User fetched",
      all,
      null
      )
    }
    else{
       return await sendResponse(
      res,
      responseCodes.OK,
      "User not fetched",
      null,
      null
    );
    }

  }),

  getSingleWithChildren: catchAsync(async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) {
    return await sendResponse(
      res,
      responseCodes.BAD,
      "Invalid user ID",
      null,
      null
    );
  }

  const user = await usersServices.getSingleWithChildren(userId);

  if (user) {
    return await sendResponse(
      res,
      responseCodes.OK,
      "User with children fetched successfully",
      user,
      null
    );
  } else {
    return await sendResponse(
      res,
      responseCodes.NOT_FOUND,
      "User not found",
      null,
      null
    );
  }
}),

};

export default usersController;
