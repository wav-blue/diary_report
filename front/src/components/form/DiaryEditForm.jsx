import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../../Api";
import { UserStateContext, DispatchContext } from "../../App";
import { ScoreBoard } from "../common/ScoreBoard";
import { GreenBoldText } from "../styled/text/BoldText";
import { TextArea } from "../styled/input/TextArea";

function DiaryEditForm() {
  const [satisfy, setSatisfy] = useState();
  const [content, setContent] = useState("");
  const [contentLength, setContentLength] = useState(0);

  const navigate = useNavigate();

  const userState = useContext(UserStateContext);

  const validateValue = () => {
    if (content.length <= 10) {
      alert("내용을 10자 이상 입력해주세요!");
      return false;
    }

    if (!satisfy) {
      alert("만족도를 입력해주세요!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userId } = userState;

    if (!validateValue()) {
      return;
    }

    if (!userId) {
      alert("로그인 후 작성 가능합니다!");
      return;
    }

    const req = {
      content,
      satisfy,
    };

    try {
      // "user" 엔드포인트로 post요청
      const res = await Api.post(`diary/${userId}`, req);
      console.log("요청에 성공하였습니다.\n응답: ", res);
      alert("일기가 작성되었습니다!");
      navigate("/diary");
    } catch (err) {
      console.log("요청에 실패하였습니다.\n", err);
    }
  };

  const { userName } = userState;
  useEffect(() => {
    if (!userName) {
      alert("로그인이 필요한 기능입니다!");
      console.log("content 확인: ", content);
      navigate("/login");
      return;
    }
  }, [userName]);

  return (
    <form>
      <hr />
      {userName && (
        <div>
          <GreenBoldText>{userName}</GreenBoldText>님의 하루 어떠셨나요?
        </div>
      )}
      <h4>Content</h4>
      <TextArea
        type="text"
        id="content"
        name="content"
        onChange={(e) => {
          setContent(e.target.value);
          setContentLength(e.target.value.length);
        }}
      />
      <p>현재 {contentLength}자 / 최대 200자</p>
      <h4>전체 만족도</h4>
      <ScoreBoard title="전체 만족도" name="satisfy" setScore={setSatisfy} />
      <hr />
      <button onClick={handleSubmit} variant="primary" type="submit">
        제출
      </button>
    </form>
  );
}

export default DiaryEditForm;
