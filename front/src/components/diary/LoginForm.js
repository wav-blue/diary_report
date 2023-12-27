import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import * as Api from "../../api";
import { DispatchContext } from "../../App";

function LoginForm() {
  const dispatch = useContext(DispatchContext);

  const [email, setEmail] = useState("exam77test.com");
  const [password, setPassword] = useState("testPassword!");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("요청 시도");
    try {
      const res = await Api.post("users/login", {
        email,
        password,
      });
      console.log("응답: ", res);
      console.log("응답: ", res.headers);

      // 유저 정보는 response의 data임.
      const user = res.data;
      console.log("const user = res.data;");
      console.log(user.user_id);
      // JWT 토큰은 유저 정보의 token임.
      const refreshToken = user.Authorization ?? "";

      sessionStorage.setItem("refreshToken", refreshToken);

      // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN",
        payload: { user_id: user.user_id, user_name: user.user_name },
      });

      console.log("완료");
    } catch (err) {
      console.log("로그인에 실패하였습니다.\n", err);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <div>로그인 정보 입력</div>
      <div>
        <h5>이메일</h5> <div>{email}</div>
      </div>
      <div>
        <h5>비밀번호</h5> <div>{password}</div>
      </div>
      <Button type="submit">로그인</Button>
    </Form>
  );
}

export default LoginForm;
