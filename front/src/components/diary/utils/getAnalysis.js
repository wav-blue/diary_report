import * as Api from "../../../Api";

async function getAnalysis(diaryId) {
  try {
    const res = await Api.post(`diary/${diaryId}/summary`);
    alert("요청을 완료했습니다.");
  } catch (err) {
    console.log("Request failed\n", err);
    alert("요청에 실패하였습니다.");
  }
}
export default getAnalysis;
