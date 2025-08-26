import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import authenticationValidator from "./authenticationValidator";
import sendResponse from "../../utils/sendResponse";
import responseCodes from "../../utils/responseCodes";
import usersServices from "../users/usersServices";
import passwordHash from "../../utils/passwordHash";
import jwtServices from "../../utils/jwtServices";
import { OAuth2Client } from "google-auth-library";

// The CLIENT_ID should be the Web Client ID from your Google Cloud Console.
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const authenticationController = {
  login: catchAsync(async (req: Request, res: Response) => {
    const { error } = authenticationValidator.login.validate(req.body);
    if (error) {
      return await sendResponse(
        res,
        responseCodes.BAD,
        error.details[0].message.replace(/"/g, ""),
        null,
        null
      );
    }
    const { email, password } = req.body;
    const user = await usersServices.getByEmail(email);
    if (!user || !user.password) {
      return await sendResponse(
        res,
        responseCodes.NOT_AUTHORIZED,
        "Invalid email or password",
        null,
        null
      );
    }
    const isValidPassword = await passwordHash.validatePassword(
      password,
      user.password
    );
    if (!isValidPassword) {
      return await sendResponse(
        res,
        responseCodes.NOT_AUTHORIZED,
        "Invalid email or password",
        null,
        null
      );
    }

    const accessToken = await jwtServices.create({ userId: user.id });

        // Remove password from response
    const userData = { ...user, accessToken };
    delete (userData as any).password;

    // const userData = JSON.parse(JSON.stringify(user));
    // delete userData.password;
    userData.accessToken = accessToken;
    return await sendResponse(
      res,
      responseCodes.OK,
      "Logged in",
      {id: user.id, name: user.name, accessToken},
      null
    );
  }),

    googleLogin: catchAsync(async (req: Request, res: Response) => {
    const { idToken } = req.body;

    if (!idToken) {
        return sendResponse(res, responseCodes.BAD, "Google ID Token is required", null, null);
    }

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.sub || !payload.email || !payload.name) {
      return sendResponse(res, responseCodes.BAD, "Invalid Google token payload", null, null);
    }

    const { sub: googleId, email, name } = payload;

    const user = await usersServices.findOrCreateByGoogle(googleId, email, name);

    const accessToken = await jwtServices.create({ userId: user.id });

    return await sendResponse(
      res,
      responseCodes.OK,
      "Logged in with Google successfully",
      { id: user.id, name: user.name, email: user.email, accessToken },
      null
    );
  }),
};

export default authenticationController;
