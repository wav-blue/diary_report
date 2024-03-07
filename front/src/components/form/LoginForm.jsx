import React, { useState, useContext } from "react";
import * as Api from "../../Api";
import { DispatchContext } from "../../App";
import { useNavigate } from "react-router-dom";
import LoginPageContainer from "../styled-components/pageContainer/LoginPageContainer";
import { DarkGreenBoldText } from "../styled-components/text/BoldText";
import RowContainer from "../styled-components/component/RowContainer";
import { GreenButton } from "../styled-components/button/ColorButton";
import { StyleLoginForm } from "../styled-components/form/StyleLoginForm";

function LoginForm() {
  const dispatch = useContext(DispatchContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        alert("로그인 정보를 입력해주세요.");
        return;
      }

      const body = { email, password };

      const res = await Api.post("users/login", body);
      console.log("?", res);

      const userData = res?.data;

      if (!userData) {
        console.log("응답 값이 올바르지 않음");
        alert("서버에 문제가 있습니다.");
      }

      // 세션에 저장: accessToken, refreshToken
      const accessToken = userData.accessToken;
      const refreshToken = userData.refreshToken ?? " ";

      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);

      dispatch({
        type: "LOGIN",
        payload: { userId: userData.userId, userName: userData.userName },
      });

      alert("로그인 성공");
      navigate("/diary");
    } catch (err) {
      console.log(err.response?.data);
      if (err.response?.data.message == "Wrong email or password") {
        alert("아이디나 비밀번호가 올바르지 않습니다.");
      } else {
        alert("로그인 요청이 제대로 완료되지 않았습니다!");
      }
    }
  };
  return (
    <StyleLoginForm onSubmit={handleSubmit}>
      <DarkGreenBoldText>로그인 정보 입력</DarkGreenBoldText>
      <div>
        <h5>이메일</h5> <div>{email}</div>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <h5>비밀번호</h5>{" "}
        <input
          type="text"
          name="password"
          value={password}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <RowContainer>
        <GreenButton type="submit">로그인</GreenButton>
        <GreenButton type="submit">회원가입</GreenButton>
      </RowContainer>
      <button
        onClick={() => {
          setEmail("exam77test.com");
          setPassword("exam77test");
        }}
      >
        테스트용 로그인
      </button>
      <button
        onClick={() => {
          setEmail("abc1212111111");
          setPassword("abc");
        }}
      >
        테스트용 로그인2
      </button>
      <button
        onClick={() => {
          setEmail("exam77test.com");
          setPassword("exam77test111");
        }}
      >
        테스트용 로그인3
      </button>
    </StyleLoginForm>
  );
}

export default LoginForm;
