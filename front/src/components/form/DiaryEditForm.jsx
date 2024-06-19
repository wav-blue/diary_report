import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../../Api";
import { UserStateContext, DispatchContext } from "../../App";
import { ScoreBoard } from "../common/ScoreBoard";
import {
  DarkGreenBoldText,
  GreenBoldText,
} from "../../styles/style-components/text/BoldText";
import { TextArea } from "../../styles/style-components/input/TextArea";
import { GreenBorderButton } from "../../styles/style-components/button/BorderColorButton";
import { GreenButton } from "../../styles/style-components/button/ColorButton";
import { LongGreenButton } from "../../styles/style-components/button/LongColorButton";
import { StyleDiaryEditForm } from "../../styles/style-components/form/StyleDiaryEditForm";
import { RadioBox } from "../../styles/style-components/component/RadioBox";

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
      navigate("/login");
      return;
    }
  }, [userName]);

  return (
    <StyleDiaryEditForm>
      {userName && (
        <div>
          <DarkGreenBoldText>{userName}</DarkGreenBoldText>님의 하루 어떠셨나요?
        </div>
      )}
      <br />
      <p>
        <DarkGreenBoldText>Content</DarkGreenBoldText>
      </p>
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
      <br />
      <p>
        <DarkGreenBoldText>전체 만족도</DarkGreenBoldText>
      </p>
      <RadioBox>
        <ScoreBoard title="전체 만족도" name="satisfy" setScore={setSatisfy} />
      </RadioBox>
      <br />
      <LongGreenButton onClick={handleSubmit} variant="primary" type="submit">
        제출
      </LongGreenButton>
    </StyleDiaryEditForm>
  );
}

export default DiaryEditForm;
