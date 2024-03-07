import * as Api from "../../../Api";

async function deleteDiary(diaryId) {
  if (confirm("정말 삭제하시겠습니까?\n삭제된 내용은 복구할 수 없습니다.")) {
    try {
      await Api.softDelete(`diary/${diaryId}`);
      alert("삭제되었습니다.");
    } catch (err) {
      alert("요청이 실패했습니다. 다시 한 번 시도해주세요!");
    }
  }
}
export default deleteDiary;
