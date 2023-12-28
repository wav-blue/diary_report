import { createDiaryDto } from "../src/db/DTO/createDiaryDto";
import { Diary } from "../src/db/DAO/Diary";
import { parseDate, lastMonth } from "../src/utils/dateFunction";

test("일기 생성 테스트", async () => {
  const newDiary = new createDiaryDto(
    {
      user_id: "01HJKR4QXTRA8E4KXFJWGCEAS8",
      meal: 5,
      sleep: 3,
      activity: 4,
      satisfaction: 3,
      comment: "피자를 먹었어요",
    },
    lastMonth(parseDate(new Date()))
  );
  console.log(newDiary);
  const result = await Diary.createDiary({ newDiary });
  console.log("데이터베이스 호출 결과: ", result);
});
test("일기 조회 테스트", async () => {
  const userId = "01HJKR4QXTRA8E4KXFJWGCEAS8";
  const result = await Diary.getDiary({
    user_id: userId,
  });
  console.log("데이터베이스 호출 결과: ", result);
});
