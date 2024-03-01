import * as Api from "../../Api";

async function deleteDiary(diaryId) {
  console.log("삭제하는 diaryId 번호:: ", diaryId);
  if (confirm("정말 삭제하시겠습니까?\n삭제된 내용은 복구할 수 없습니다.")) {
    try {
      const res = await Api.softDelete(`diary/${diaryId}`);
      console.log("요청에 성공하였습니다.\n응답: ", res);
      alert("삭제되었습니다.");
    } catch (err) {
      console.log("요청에 실패하였습니다.\n", err);
    }
  }
}
export default deleteDiary;
