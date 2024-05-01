import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { commonMiddleWare } from "../middlewares/common.middleware";

const router = Router();

router.post(
  "/sign-up",
  commonMiddleWare.isCreatedDataValid,
  authController.signUp,
);
router.post(
  "/sign-in",
  // commonMiddleWare.isCreatedDataValid,
  authController.signIn,
);

export const authRouter = router;
