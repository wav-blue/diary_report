import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserStateContext } from "../../App";
import * as Api from "../../Api";

function MainPage() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const { userId, userName } = userState;

  // useState 훅을 통해 users 상태를 생성함.
  const [diarys, setDiarys] = useState();

  // user 상태를 생성

  // useEffect(() => {
  //   Api.get(`diary/current`).then((res) => {
  //     setDiarys(res.data);
  //   });
  // }, [userState, navigate]);

  return (
    <div id="mainContainer">
      <h3>메인 페이지 </h3>
      <button onClick={() => navigate("/test")}>테스트 페이지</button>
      <button class="diary" onClick={() => navigate("/diary")}>
        작성한 일기
        <br />
        확인하러 가기
      </button>
      <button class="login" onClick={() => navigate("/login")}>
        로그인
      </button>
      <button class="report" onClick={() => navigate("/diary/edit")}>
        작성하기
      </button>
    </div>
  );
}

export default MainPage;
