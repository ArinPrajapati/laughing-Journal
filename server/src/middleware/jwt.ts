import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      data?: jwt.JwtPayload | string;
    }
  }
}

export const jwtMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET as jwt.Secret,
    (
      err: jwt.VerifyErrors | null,
      decoded: jwt.JwtPayload | string | undefined
    ) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Failed to authenticate token" });
      }

      req.data = decoded;
      console.log(req.data);
      next();
    }
  );
};
