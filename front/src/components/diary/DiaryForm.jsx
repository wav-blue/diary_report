import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../../Api";
import { ScoreBoard } from "./ScoreBoard";

const handleSubmit = async (e) => {
  const userId = "01HJKR4QXTRA8E4KXFJWGCEAS8";
  e.preventDefault();
  console.log(`${userId}로 요청 시도`);
  try {
    // "user" 엔드포인트로 post요청
    const res = await Api.post(`${userId}/diary`, {
      meal: myscore[0],
      sleep: myscore[1],
      activity: myscore[2],
      total: myscore[3],
      comment: mycomment,
    });
    console.log("요청에 성공하였습니다.\n응답: ", res);
  } catch (err) {
    console.log("요청에 실패하였습니다.\n", err);
  }
};
function DiaryForm() {
  const [username, setUsername] = useState("기본 닉네임");
  const [myscore, setMyscore] = useState([0, 0, 0, 0]);

  return (
    <>
      <div>{username}님의 하루 어떠셨나요?</div>
      <div>
        <label for="name">식사</label>
        <input type="radio" name="meal" value={1}></input>
        <input type="radio" name="meal" value={2}></input>
        <input type="radio" name="meal" value={3}></input>
        <input type="radio" name="meal" value={4}></input>
        <input type="radio" name="meal" value={5}></input>
      </div>

      <ScoreBoard title="식사" name="meal" onClickHandler={setMyscore()} />
      <ScoreBoard title="수면" name="sleep" />
      <ScoreBoard title="운동(활동량)" name="activity" />
      <ScoreBoard title="전체 만족도" name="total" />
      <label for="name">Comment</label>

      <input
        type="text"
        id="name"
        name="name"
        required
        minlength="4"
        maxlength="8"
        size="10"
      />

      <button onSubmit={handleSubmit} variant="primary" type="submit">
        제출
      </button>
    </>
  );
}

export default DiaryForm;
