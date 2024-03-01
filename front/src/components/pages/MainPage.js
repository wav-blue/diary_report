import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserStateContext } from "../../App";
import * as Api from "../../Api";
import MainPageContainer from "../styled/pageContainer/MainPageContainer";
import { GreenBorderButton } from "../styled/button/BorderColorButton";
import { SmallRedText } from "../styled/text/SmallText";
import { HoverChangeCursor } from "../styled/component/HoverChangeCursor";

function MainPage() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const { userName } = userState;

  // useState 훅을 통해 users 상태를 생성함.
  // const [user, setUser] = useState();

  return (
    <MainPageContainer id="mainContainer">
      <h3>${userName}님, 어서 오세요!</h3>
      <SmallRedText> ↓ 로고를 클릭해 두두에 대해 알아보세요!</SmallRedText>
      <HoverChangeCursor onClick={() => navigate("/intro")}>
        <img
          src={process.env.PUBLIC_URL + "/image/Logo.png"}
          alt="로고 이미지"
        />
      </HoverChangeCursor>

      <GreenBorderButton class="diary" onClick={() => navigate("/diary")}>
        일기 보기
      </GreenBorderButton>
      <GreenBorderButton class="login" onClick={() => navigate("/login")}>
        로그인
      </GreenBorderButton>
      <GreenBorderButton class="report" onClick={() => navigate("/diary/edit")}>
        작성하기
      </GreenBorderButton>
    </MainPageContainer>
  );
}

export default MainPage;
