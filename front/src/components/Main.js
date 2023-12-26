import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  // user 상태를 생성
  const [user, setUser] = useState(null);

  return (
    <>
      <div>메인 페이지 </div>
      <button onClick={() => navigate("/test")}>테스트 페이지</button>
      <button onClick={() => navigate("/report")}>보고서 페이지</button>
    </>
  );
}

export default Main;
