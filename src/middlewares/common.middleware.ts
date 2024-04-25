import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../api-error";
import { IUser } from "../user.interface";

class CommonMiddleware {
  public isIdValid(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.userId;
      if (!isObjectIdOrHexString(id)) {
        throw new ApiError("Invalid id", 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
  public isCreatedDataValid(validator: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = req.body as Partial<IUser>;
        const { error, value } = validator.validate(data);
        if (error) {
          const errorMessage = error.details
            .map((err) => err.message)
            .join(", ");
          throw new ApiError(errorMessage, 400);
        }
        req.body = value;
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const commonMiddleWare = new CommonMiddleware();
