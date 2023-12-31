import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserStateContext, DispatchContext } from "../App";
import "../CSS/header.css";

function Header() {
  const navigate = useNavigate();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  console.log("현재 userState: ", userState);
  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태
  const isLogin = !!userState.user_id;

  console.log("현재 isLogin: ", isLogin, userState.user_id);
  const login = () => {
    navigate("/login");
  };

  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    alert("로그아웃 실행");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  return (
    <div activeKey={location.pathname}>
      <a onClick={() => navigate("/")}>메인</a>
      {!isLogin && <a onClick={login}>로그인</a>}
      {isLogin && <a onClick={logout}>로그아웃</a>}
    </div>
  );
}

export default Header;
