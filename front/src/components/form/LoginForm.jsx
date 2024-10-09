import React, { useState, useContext } from "react";
import * as Api from "../../Api";
import { DispatchContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { DarkGreenBoldText } from "../../styles/style-components/text/BoldText";
import RowContainer from "../../styles/style-components/component/RowContainer";
import { GreenButton } from "../../styles/style-components/button/ColorButton";
import { StyleLoginForm } from "../../styles/style-components/form/StyleLoginForm";
import { SmallDarkGreenBoldText } from "../../styles/style-components/text/SmallBoldText";

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

      const userData = res?.data;

      if (!userData) {
        alert("서버에 문제가 있습니다.");
      }

      // Save Access Token
      const accessToken = userData.accessToken;

      sessionStorage.setItem("accessToken", accessToken);

      dispatch({
        type: "LOGIN",
        payload: { userId: userData.userId, userName: userData.userName },
      });

      alert("로그인 성공");
      navigate("/diary");
    } catch (err) {
      if (err.response?.data.message == "Wrong email or password") {
        alert("아이디나 비밀번호가 올바르지 않습니다.");
      } else {
        alert("로그인 요청이 제대로 완료되지 않았습니다!");
      }
    }
  };
  return (
    <StyleLoginForm onSubmit={handleSubmit}>
      <p>
        <DarkGreenBoldText>로그인 정보 입력</DarkGreenBoldText>
      </p>
      <br />
      <div>
        <p>
          <SmallDarkGreenBoldText>이메일</SmallDarkGreenBoldText>
        </p>
        <input
          type="id"
          name="email"
          value={email}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <br />
        <p>
          <SmallDarkGreenBoldText>비밀번호</SmallDarkGreenBoldText>
        </p>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <RowContainer>
        <GreenButton type="submit">로그인</GreenButton>
        <GreenButton onClick={() => navigate("/register")}>
          회원가입
        </GreenButton>
      </RowContainer>
    </StyleLoginForm>
  );
}

export default LoginForm;
