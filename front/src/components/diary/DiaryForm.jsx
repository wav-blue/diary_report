import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../../Api";
import { UserStateContext, DispatchContext } from "../../App";
import { ScoreBoard } from "../common/ScoreBoard";
import { TextArea } from "../common/TextArea";

function DiaryForm() {
  const [username, setUsername] = useState("기본 닉네임");
  const [satisfy, setSatisfy] = useState();
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userId, userName } = userState;

    if (!userId) {
      alert("유저 정보가 존재하지 않습니다!");
      navigate("/");
      return;
    }

    console.log(meal, setMeal);

    const req = {
      meal,
      sleep,
      activity,
      satisfy,
      content,
    };
    console.log("값 : ", req);

    console.log(`${userId}로 요청 시도`);
    try {
      // "user" 엔드포인트로 post요청
      const res = await Api.post(
        `${userId}/diary`,
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
      <h4>Content</h4>
      <TextArea
        type="text"
        id="content"
        name="content"
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <h4>전체 만족도</h4>
      <ScoreBoard title="전체 만족도" name="satisfy" setScore={setSatisfy} />
      <hr />

      <button onClick={handleSubmit} variant="primary" type="submit">
        제출
      </button>
    </form>
  );
}

export default DiaryForm;
