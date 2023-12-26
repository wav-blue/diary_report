import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { UserStateContext, DispatchContext } from "../App";

function Header() {
  const navigate = useNavigate();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태
  const isLogin = !!userState.user;

  const login = () => {
    alert("로그인 실행");
  };

  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    alert("로그아웃 실행");
    // 기본 페이지로 돌아감.
    navigate("/");
  };

  return (
    <Nav activeKey={location.pathname}>
      <Nav.Item>
        <Nav.Link onClick={() => navigate("/network")}>네트워크</Nav.Link>
      </Nav.Item>
      {!isLogin && (
        <Nav.Item>
          <Nav.Link onClick={login}>로그인</Nav.Link>
        </Nav.Item>
      )}
      {isLogin && (
        <Nav.Item>
          <Nav.Link onClick={logout}>로그아웃</Nav.Link>
        </Nav.Item>
      )}
    </Nav>
  );
}

export default Header;
