import { Router } from "express";
import { userService } from "../services/userService";

import userController from "../controller/userController";
import { loginRequired } from "../middlewares/loginRequired";
import { NotFoundError } from "../../libraries/custom-error";
import { validateRefreshToken } from "../utils/validateToken";

import jwt from "jsonwebtoken";
import { createAccessToken } from "../utils/createToken";

const userRouter = Router();

// 회원가입
userRouter.post("/users/register", userController.createUser);

// 로그인
userRouter.post("/users/login", userController.loginUser);

// 로그아웃
userRouter.get("/users/logout", userController.logoutUser);

// 현재 사용자 확인
userRouter.get("/current", loginRequired, userController.currentUser);

// Access Token 재발급
userRouter.post("/accessToken", async function (req, res, next) {
  try {
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";

    const accessToken = req.body.accessToken?.split(" ")[1] ?? null;
    const refreshToken = req.body.refreshToken?.split(" ")[1] ?? null;

    console.log("body >> ", accessToken);
    console.log("body >> ", refreshToken);

    // cookie가 만료된 경우 => 로그인부터 다시
    if (!accessToken || !refreshToken) {
      throw new NotFoundError("필요한 Token이 존재하지 않음");
    }
    //response.status === 404 || response.status === 401
    // token 유효기간 검증
    const isRefreshTokenValidate = validateRefreshToken(refreshToken);

    const accessTokenId = jwt.decode(accessToken, secretKey);
    const user_data = { user_id: accessTokenId.user_id };

    // Refresh Token 만료 => 로그인부터 다시
    if (!isRefreshTokenValidate) {
      throw new TokenExpiredError("Refresh Token 만료");
    }
    const newAccessToken = await createAccessToken(user_data, secretKey);
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      signed: true,
      maxAge: 1 * 60 * 60 * 1000,
    });

    res.status(201).json("Access Token 재발급이 완료되었습니다");
  } catch (err) {
    next(err);
  }
});

export { userRouter };
