import { User } from "../db/DAO/User";

class userService {
  // 유저 정보 조회
  static async getUser({ user_id }) {
    const result = await User.getUser({ user_id });
    return result;
  }
  // 추가
  static async createUser({ newUser }) {
    const result = User.createUser({ newUser });
    return result;
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
