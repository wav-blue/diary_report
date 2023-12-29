import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../CSS/main.css";

function Main() {
  const navigate = useNavigate();
  // user 상태를 생성

  return (
    <>
      <div>메인 페이지 </div>
      <div id="mainContainer">
        <button onClick={() => navigate("/test")}>테스트 페이지</button>
        <button class="diary" onClick={() => navigate("/diary")}>
          보고서 페이지
        </button>
        <button class="login" onClick={() => navigate("/login")}>
          로그인 페이지
        </button>
        <button class="report" onClick={() => navigate("/diary/edit")}>
          작성 페이지로 이동
        </button>
      </div>
    </>
  );
}

export default Main;
