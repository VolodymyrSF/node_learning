import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api-error";
import { IUser } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
  public async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getUsers();
      res.json(users);
    } catch (e) {
      next(e);
    }
  }
  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as Partial<IUser>;
      const newUser = await userService.createUser(dto);
      res.status(201).json(newUser);
    } catch (e) {
      next(e);
    }
  }
  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await userService.getById(id);
      if (!user) {
        throw new ApiError("user not found", 404);
      }
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }
  public async putById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body as Partial<IUser>;
      const { id } = req.params;
      const user = await userService.putById(data, id);
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }
  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await userService.deleteById(id);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
