import { User } from "../db/DAO/User";
import bcrypt from "bcrypt";
import { createAccessToken } from "../utils/createToken";
import { UnauthorizedError } from "../../libraries/custom-error";

class userService {
  // 유저 정보 조회
  static async getUser({ user_id }) {
    const result = await User.getUser({ user_id });
    return result;
  }
  static async getUsernameById({ user_id }) {
    const user_name = await User.findUsernameById({ user_id });
    return user_name;
  }
  // 추가
  static async createUser({ newUser }) {
    const result = User.createUser({ newUser });
    return result;
  }

  // 유저 로그인
  static async loginUser({ email, password }) {
    // 이메일로 유저 정보 조회
    const findUser = await User.findUserByEmail({ email });
    if (findUser.length === 0) {
      throw new NotFoundError("가입 이력이 없습니다.");
    }

    // 비밀번호 확인
    const correctPasswordHash = findUser[0].password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      throw new UnauthorizedError("비밀번호가 일치하지 않습니다.");
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";

    const user_data = { user_id: findUser[0]["user_id"] };

    const accessToken = await createAccessToken(user_data, secretKey);

    // 반환할 loginuser 객체
    const loginUser = {
      accessToken,
      user_id: findUser[0]["user_id"],
      user_name: findUser[0]["user_name"],
    };

    return loginUser;
  }

  // 수정
  //   static async updateUser(newData) {
  //     return "";
  //   }
  // 삭제
  //   static async deleteUser() {
  //     const result = User.deleteUser();
  //     return result;
  //   }
}
export { userService };
