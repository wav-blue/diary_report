import { createDiaryDto } from "../src/db/DTO/createDiaryDto";
import { Diary } from "../src/db/DAO/Diary";
import { parseDate } from "../src/utils/dateFunction";

test("일기 생성 테스트", async () => {
  const newDiary = new createDiaryDto(
    {
      user_id: "01HJKHM0TYXNKR9X1JSQXC6BEA",
      meal: 5,
      sleep: 3,
      satisfaction: 5,
    },
    parseDate(new Date())
  );
  console.log(newDiary);
  const result = await Diary.createDiary({ newDiary });
  console.log("데이터베이스 호출 결과: ", result);
});
test("일기 조회 테스트", async () => {
  const userId = "01HJKHM0TYXNKR9X1JSQXC6BEA";
  const result = await Diary.getDiary({
    user_id: userId,
  });
  console.log("데이터베이스 호출 결과: ", result);
});
