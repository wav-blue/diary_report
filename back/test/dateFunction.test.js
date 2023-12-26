import { parseDate } from "../src/utils/dateFunction";

test("Date 변환 테스트", async () => {
  const input = new Date();
  const result = await parseDate(input);
  console.log("변환 결과: ", result);
});
