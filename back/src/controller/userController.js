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
    res.json();
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
