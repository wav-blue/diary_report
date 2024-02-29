import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserStateContext, DispatchContext } from "../App";
import CustomHeader from "./styled/CustomHeader";

function Header() {
  const navigate = useNavigate();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태
  const isLogin = !!userState.userId;

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
    <CustomHeader activeKey={location.pathname}>
      <a id="logoImg" onClick={() => navigate("/")}>
        <img
          src={process.env.PUBLIC_URL + "/image/Logo.png"}
          alt="로고"
          width="70"
          height="35"
        />
      </a>
      <a id="stateText">
        {!isLogin && <a onClick={login}>로그인</a>}
        {isLogin && <a onClick={logout}>로그아웃</a>}
      </a>
    </CustomHeader>
  );
}

export default Header;
