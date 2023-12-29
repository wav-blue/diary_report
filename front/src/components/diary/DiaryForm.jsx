import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../../Api";
import { ScoreBoard } from "./ScoreBoard";
import { UserStateContext, DispatchContext } from "../../App";

function DiaryForm() {
  const [username, setUsername] = useState("기본 닉네임");
  const [meal, setMeal] = useState();
  const [sleep, setSleep] = useState();
  const [activity, setActivity] = useState();
  const [satisfaction, setSatisfaction] = useState();
  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { user_id, user_name } = userState;

    if (!user_id) {
      alert("유저 정보가 존재하지 않습니다!");
      navigate("/");
      return;
    }

    console.log(meal, setMeal);

    const req = {
      meal,
      sleep,
      activity,
      satisfaction,
      comment,
    };
    console.log("값 : ", req);

    console.log(`${user_id}로 요청 시도`);
    try {
      // "user" 엔드포인트로 post요청
      const res = await Api.post(
        `${user_id}/diary`,
        req,
        true,
        "application/json"
      );
      console.log("요청에 성공하였습니다.\n응답: ", res);
      navigate("/diary");
    } catch (err) {
      console.log("요청에 실패하였습니다.\n", err);
    }
  };

  return (
    <form>
      <hr />
      <div>{username}님의 하루 어떠셨나요?</div>
      <h4>식사</h4>
      <ScoreBoard title="식사" name="meal" setScore={setMeal} />
      <h4>수면</h4>
      <ScoreBoard title="수면" name="sleep" setScore={setSleep} />
      <h4>운동(활동량)</h4>
      <ScoreBoard title="운동(활동량)" name="activity" setScore={setActivity} />

      <h4>전체 만족도</h4>
      <ScoreBoard
        title="전체 만족도"
        name="satisfaction"
        setScore={setSatisfaction}
      />
      <hr />
      <h4>Comment</h4>
      <input
        type="text"
        id="name"
        name="name"
        minlength="4"
        maxlength="8"
        size="10"
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />

      <button onClick={handleSubmit} variant="primary" type="submit">
        제출
      </button>
    </form>
  );
}

export default DiaryForm;
