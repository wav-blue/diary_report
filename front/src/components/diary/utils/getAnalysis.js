import * as Api from "../../../Api";

async function getAnalysis(diaryId) {
  try {
    const res = await Api.get(`diary/${diaryId}/summary`);
    console.log("요청에 성공하였습니다.\n응답: ", res);
    alert("요청을 완료했습니다.");
  } catch (err) {
    console.log("요청에 실패하였습니다.\n", err);
    alert("요청에 실패하였습니다.");
  }
}
export default getAnalysis;
