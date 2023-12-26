import { User } from "../src/db/DAO/User";
import { createUserDto } from "../src/db/DTO/createUserDto";
import { ulid } from "ulidx";
import { parseDate } from "../src/utils/dateFunction";

test("유저 생성 테스트", async () => {
  const test_email =
    "exam" + String(Math.floor(Math.random() * 100)) + "test.com";
  const test_data = {
    email: test_email,
    password: "testPassword!",
    user_name: "테스트계정",
  };
  const newUser = new createUserDto(
    {
      user_id: ulid(),
      ...test_data,
    },
    parseDate(new Date())
  );
  await newUser.passwordEncrypt();
  console.log(newUser);
  const result = await User.createUser({ newUser });
  console.log("데이터베이스 호출 결과: ", result);
});
