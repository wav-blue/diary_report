import * as Api from "../../Api";
import { DateKorean } from "../common/DateKorean";

function DiaryCard(props) {
  return (
    <div>
      <DateKorean>{props.date}</DateKorean>
      <div>
        <p>{props.summary}</p>
      </div>
      <div>
        <label>전체적인 만족도 </label>
        <p>{"★".repeat(props.satisfy)}점</p>
      </div>
      <button
        onClick={(e) => {
          deleteDiary(props.diaryId);
        }}
      >
        삭제
      </button>
    </div>
  );
}
async function deleteDiary(diaryId) {
  console.log("삭제할 번호:: ", diaryId);
  if (confirm("정말 삭제하시겠습니까?\n삭제된 내용은 복구할 수 없습니다.")) {
    console.log(`삭제 요청 시도`);
    try {
      // "user" 엔드포인트로 post요청
      const res = await Api.softDelete(`diary/${diaryId}`);
      console.log("요청에 성공하였습니다.\n응답: ", res);
      alert("삭제되었습니다.");
    } catch (err) {
      console.log("요청에 실패하였습니다.\n", err);
    }
  }
}
export default DiaryCard;
