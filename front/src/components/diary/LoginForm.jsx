import React, { useState, useContext } from "react";
import * as Api from "../../Api";
import { DispatchContext } from "../../App";

function LoginForm() {
  const dispatch = useContext(DispatchContext);

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
    console.log("요청 시도");
    try {
      console.log("email, pwd: ", email, password);

      console.log("e.taget.value: ", e.target.value);

      if (!email || !password) {
        alert("이메일이나 비밀번호가 입력되지 않았습니다!");
      }

      const res = await Api.post(
        "users/login",
        {
          email,
          password,
        },
        1,
        "application/json"
      );
      console.log("응답: ", res);

      // 유저 정보는 response의 data임.
      const user = res.data;
      console.log("user>>>>>");
      console.log(user);
      // JWT 토큰은 유저 정보의 token임.
      const accessToken = user.accessToken;
      const refreshToken = user.refreshToken ?? "";

      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);

      // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN",
        payload: { userId: user.userId, userName: user.userName },
      });

      if (!accessToken) {
        alert("로그인 요청이 제대로 완료되지 않았습니다!\n다시 시도해주세요.");
      } else {
        alert("로그인 성공");
      }
    } catch (err) {
      console.log("로그인에 실패", err);
      if (err.response.data.message == "가입 이력이 없습니다.") {
        alert("가입 이력이 없습니다.");
      } else {
        alert("로그인 요청이 제대로 완료되지 않았습니다!\n다시 시도해주세요.");
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>로그인 정보 입력</div>
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
      <button type="submit">로그인</button>
    </form>
  );
}

export default LoginForm;
