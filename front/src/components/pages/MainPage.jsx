import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserStateContext } from "../../App";
import * as Api from "../../Api";
import GreenButton from "../styled/GreenButton";
import MainPageContainer from "../styled/MainPageContainer";

function MainPage() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const { userId, userName } = userState;

  // useState 훅을 통해 users 상태를 생성함.
  const [diarys, setDiarys] = useState();

  return (
    <MainPageContainer id="mainContainer">
      <h3>메인 페이지 </h3>
      <GreenButton onClick={() => navigate("/test")}>테스트 페이지</GreenButton>
      <img src={process.env.PUBLIC_URL + "/image/Logo.png"} alt="로고 이미지" />
      <GreenButton class="diary" onClick={() => navigate("/diary")}>
        작성한 일기
        <br />
        확인하러 가기
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
