import { Router } from "express";
import { userService } from "../services/userService";

import userController from "../controller/userController";

const userRouter = Router();

// 회원가입
userRouter.post("/users/register", userController.createUser);

// 로그인
userRouter.post("/users/login", userController.loginUser);

// 로그아웃
userRouter.get("/users/logout", userController.logoutUser);

export { userRouter };
