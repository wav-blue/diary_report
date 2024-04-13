import React, { useContext } from "react";
import * as Api from "../../Api.js";
import { useNavigate } from "react-router-dom";
import { UserStateContext, DispatchContext } from "../../App";
import CustomHeader from "../../styles/style-components/CustomHeader";
import { HoverChangeCursor } from "../../styles/style-components/component/HoverChangeCursor.jsx";

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
  async function logout() {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");

    alert("로그아웃 완료");

    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  }

  return (
    <CustomHeader activeKey={location.pathname}>
      <HoverChangeCursor onClick={() => navigate("/")}>
        <h2>두두</h2>
      </HoverChangeCursor>
      <a id="stateText">
        {!isLogin && <a onClick={login}>로그인</a>}
        {isLogin && <a onClick={logout}>로그아웃</a>}
      </a>
    </CustomHeader>
  );
}

export default Header;
