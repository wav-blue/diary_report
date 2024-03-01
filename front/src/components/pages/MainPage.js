import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserStateContext } from "../../App";
import * as Api from "../../Api";
import { GreenButton } from "../styled/button/BorderColorButton";
import { RainbowText } from "../styled/text/RainbowText";
import MainPageContainer from "../styled/pageContainer/MainPageContainer";
import { HoverBigImage } from "../styled/component/HoverBigImage";

function MainPage() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const { userId, userName } = userState;

  // useState 훅을 통해 users 상태를 생성함.
  const [diarys, setDiarys] = useState();

  return (
    <MainPageContainer id="mainContainer">
      <h3>메인 페이지 </h3>
      <RainbowText> ↓ 로고를 클릭해 두두에 대해 알아보세요!</RainbowText>
      <HoverBigImage>
        <img
          src={process.env.PUBLIC_URL + "/image/Logo.png"}
          onClick={() => navigate("/intro")}
          alt="로고 이미지"
        />
      </HoverBigImage>

      <GreenButton class="diary" onClick={() => navigate("/diary")}>
        일기 보기
      </GreenButton>
      <GreenButton class="login" onClick={() => navigate("/login")}>
        로그인
      </GreenButton>
      <GreenButton class="report" onClick={() => navigate("/diary/edit")}>
        작성하기
      </GreenButton>
    </MainPageContainer>
  );
}

export default MainPage;
