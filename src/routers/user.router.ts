import { Router } from "express";

import { userController } from "../controllers/user.controller";

const router = Router();

router.get("/", userController.getUsers);
router.post("/", userController.createUser);
router.get("/:id", userController.getById);

export const userRouter = router;
