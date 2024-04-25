import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleWare } from "../middlewares/common.middleware";

const router = Router();

router.get("/", userController.getUsers);
router.post(
  "/",
  commonMiddleWare.isCreatedDataValid,
  userController.createUser,
);

router.get("/:id", commonMiddleWare.isIdValid, userController.getById);
router.put(
  "/:id",
  commonMiddleWare.isIdValid,
  commonMiddleWare.isUpdateDataValid,
  userController.putById,
);
router.delete("/:id", commonMiddleWare.isIdValid, userController.deleteById);

export const userRouter = router;
