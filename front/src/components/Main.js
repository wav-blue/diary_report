import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  // user 상태를 생성

  return (
    <>
      <div>메인 페이지 </div>
      <button onClick={() => navigate("/test")}>테스트 페이지</button>
      <button onClick={() => navigate("/diary")}>보고서 페이지</button>
      <button onClick={() => navigate("/login")}>로그인 페이지</button>
    </>
  );
}

export default Main;
