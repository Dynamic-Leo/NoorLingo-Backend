import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export interface AuthPayload extends JwtPayload {
  userId: number;
}

const jwtServices = {
  create: async (data: object, expiresIn?: string) => {
    const jwtKey = process.env.JWT_SECRET;
    if (!jwtKey) {
      throw new Error("JWT secret key not found in environment variables");
    }

    const expireIn = expiresIn || process.env.ACCESS_TOKEN_EXPIRES_IN || "365d";
    return jwt.sign(data, jwtKey, { expiresIn: expireIn });
  },

  authenticate: async (token: string): Promise<AuthPayload | null> => {
    try {
      const jwtKey = process.env.JWT_SECRET;
      if (!jwtKey) {
        throw new Error("JWT secret key not found in environment variables");
      }

      const decoded = jwt.verify(token, jwtKey) as JwtPayload | string;

      // Ensure we only return objects that contain userId
      if (typeof decoded === "string") return null;
      if (!("userId" in decoded)) return null;

      return decoded as AuthPayload;
    } catch (error) {
      console.log("JWT verification error:", error);
      return null;
    }
  },
};

export default jwtServices;
