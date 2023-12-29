import { NotFoundError } from "../../libraries/custom-error";
import { createUserDto } from "../db/DTO/createUserDto";
import { userService } from "../services/userService";
import { createRandomId } from "../utils/loginUtils";

// 회원가입
exports.createUser = async function (req, res, next) {
  try {
    const { email, password, user_name } = req.body;

    const newUser = new createUserDto(
      {
        user_id: await createRandomId(),
        email,
        password,
        user_name,
      },
      new Date()
    );
    await newUser.passwordEncrypt();
    const user = await userService.createUser({ newUser });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// 로그인
exports.loginUser = async function (req, res, next) {
  try {
    const { email, password } = req.body;
    console.log("email: ", email, password);

    if (!email || !password) {
      throw new Error("필수 정보가 입력되지 않았습니다.");
    }
    console.log("email >> '", email, password);
    const user = await userService.loginUser({ email, password });
    res.cookie("accessToken", user.accessToken, {
      maxAge: 1 * 60 * 60 * 1000,
      signed: true,
    });

    const user_data = {
      user_id: user.user_id,
      user_name: user.user_name,
      accessToken: user.accessToken,
      authorization: user.refreshToken ?? null,
    };
    res.status(200).send(user_data);
  } catch (error) {
    next(error);
  }
};

exports.logoutUser = async function (req, res, next) {
  try {
    // 토큰 파기
    res.cookie("accessToken", null, {
      maxAge: 0,
    });
    res.send("로그아웃 완료");
  } catch (error) {
    next(error);
  }
};

exports.currentUser = async function (req, res, next) {
  try {
    console.log("currentUser호출");
    const user_id = req.currentUserId;
    if (!user_id) {
      throw NotFoundError("Access Token 없음");
    }
    const user_name = await userService.getUsernameById({ user_id });
    const user = {
      user_id,
      user_name,
    };
    console.log("user정보: ", user);
    res.json(user);
  } catch (error) {
    next(error);
  }
};
