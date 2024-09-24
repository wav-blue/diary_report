import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserStateContext } from "../App";
import MainPageContainer from "../styles/style-components/pageContainer/MainPageContainer";
import { GreenBorderButton } from "../styles/style-components/button/BorderColorButton";
import { SmallRedText } from "../styles/style-components/text/SmallText";
import { HoverChangeCursor } from "../styles/style-components/component/HoverChangeCursor";
import ColumnFlexContainer from "../styles/style-components/component/ColumnFlexContainer";
import { DarkGreenBoldText } from "../styles/style-components/text/BoldText";

function MainPage() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const { userName } = userState;

  return (
    <MainPageContainer id="mainContainer">
      {userName && (
        <>
          <DarkGreenBoldText>{userName}님, 어서 오세요!</DarkGreenBoldText>
          <img
            src={process.env.PUBLIC_URL + "/image/Logo.png"}
            alt="로고 이미지"
          />
        </>
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
      {!userName && (
        <GreenBorderButton className="login" onClick={() => navigate("/login")}>
          로그인
        </GreenBorderButton>
      )}

      <GreenBorderButton
        className="report"
        onClick={() => navigate("/diary/new")}
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
