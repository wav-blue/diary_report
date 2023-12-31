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

exports.loginUser = async function (req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("필수 정보가 입력되지 않았습니다.");
    }
    console.log("email >> '", email, password);
    const user = await userService.loginUser({ email, password });

    res.cookie("accessToken", user.accessToken, {
      httpOnly: true,
      signed: true,
      maxAge: 1 * 60 * 60 * 1000,
    });

    const user_data = {
      user_id: user.user_id,
      Authorization: user.refreshToken,
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
