import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserStateContext } from "../../App";
import * as Api from "../../Api";
import MainPageContainer from "../styled-components/pageContainer/MainPageContainer";
import { GreenBorderButton } from "../styled-components/button/BorderColorButton";
import { SmallRedText } from "../styled-components/text/SmallText";
import { HoverChangeCursor } from "../styled-components/component/HoverChangeCursor";
import ColumnFlexContainer from "../styled-components/component/ColumnFlexContainer";
import {
  DarkGreenBoldText,
  GreenBoldText,
} from "../styled-components/text/BoldText";

function MainPage() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const { userName } = userState;

  // useState 훅을 통해 users 상태를 생성함.
  // const [user, setUser] = useState();

  return (
    <MainPageContainer id="mainContainer">
      {userName && (
        <DarkGreenBoldText>{userName}님, 어서 오세요!</DarkGreenBoldText>
      )}
      {!userName && (
        <ColumnFlexContainer>
          <DarkGreenBoldText>처음 오셨나요?</DarkGreenBoldText>
          <SmallRedText> ↓ 로고를 클릭해 두두에 대해 알아보세요!</SmallRedText>
          <HoverChangeCursor onClick={() => navigate("/intro")}>
            <img
              src={process.env.PUBLIC_URL + "/image/Logo.png"}
              alt="로고 이미지"
            />
          </HoverChangeCursor>
        </ColumnFlexContainer>
      )}

      <GreenBorderButton className="diary" onClick={() => navigate("/diary")}>
        일기 보기
      </GreenBorderButton>
      <GreenBorderButton className="login" onClick={() => navigate("/login")}>
        로그인
      </GreenBorderButton>
      <GreenBorderButton
        className="report"
        onClick={() => navigate("/diary/edit")}
      >
        작성하기
      </GreenBorderButton>
      <GreenBorderButton onClick={() => navigate("/my")}>
        마이페이지
      </GreenBorderButton>
    </MainPageContainer>
  );
}

export default MainPage;
