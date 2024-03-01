import * as Api from "../../Api";

async function getAnalysis(diaryId) {
  console.log("해당하는 diaryId 번호로 분석 요청:: ", diaryId);
  try {
    // const res = await Api.softDelete(`diary/${diaryId}`);
    console.log("요청에 성공하였습니다.\n응답: ", res);
    alert("요청을 완료했습니다.\n잠시 기다려주세요.");
  } catch (err) {
    console.log("요청에 실패하였습니다.\n", err);
    alert("요청에 실패하였습니다.");
  }
}
export default getAnalysis;
