import React, { useState, useContext } from "react";
import * as Api from "../../Api";
import { useNavigate } from "react-router-dom";
import { DispatchContext } from "../../App";
import { randomUserName } from "../../utils/register/randomUserName";
import { DarkGreenBoldText } from "../../styles/style-components/text/BoldText";
import {
  GreenButton,
  RedButton,
} from "../../styles/style-components/button/ColorButton";
import { SmallDarkGreenBoldText } from "../../styles/style-components/text/SmallBoldText";
import { LongGreenButton } from "../../styles/style-components/button/LongColorButton";

function RegisterForm() {
  const dispatch = useContext(DispatchContext);

  const navigate = useNavigate();

  const [complete, setComplete] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userName, setUserName] = useState();
  const [warn, setWarn] = useState("");

  const setRandomUserName = () => {
    setUserName(randomUserName());
  };

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "userName") {
      setUserName(e.target.value);
    }
  };

  const checkComplete = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setWarn("이메일이나 비밀번호가 입력되지 않았습니다!");
      return;
    }
    setWarn("");
    setComplete(true);
  };

  const registerCompleteSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        alert("이메일이나 비밀번호가 입력되지 않았습니다!");
      }

      const res = await Api.post("users/register", {
        email,
        password,
        userName,
      });

      alert("회원가입이 완료되었습니다!");

      const user = res.data;

      const accessToken = user.accessToken;

      sessionStorage.setItem("accessToken", accessToken);

      // 로그인 성공 상태로
      dispatch({
        type: "LOGIN",
        payload: { userId: user.userId, userName: user.userName },
      });

      if (!accessToken) {
        alert("로그인 도중 오류가 발생했습니다.");
      } else {
        navigate("/diary");
      }
    } catch (err) {
      if (err.response.data.message) {
        alert(
          `로그인 요청이 제대로 완료되지 않았습니다!\n다시 시도해주세요.\n(에러 메시지: ${err.response.data.message})`
        );
      } else {
        alert(`로그인 요청이 제대로 완료되지 않았습니다!\n다시 시도해주세요.`);
      }
    }
  };
  return (
    <div>
      {!complete && (
        <>
          <DarkGreenBoldText>회원가입 정보 입력</DarkGreenBoldText>
          <div>
            <h5>이메일</h5>
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
              type="password"
              name="password"
              value={password}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <GreenButton
            onClick={(e) => {
              checkComplete(e);
            }}
          >
            다음으로 →
          </GreenButton>
          <p>{warn}</p>
        </>
      )}

      {complete && (
        <>
          <RedButton
            onClick={(e) => {
              setComplete(false);
            }}
          >
            돌아가기
          </RedButton>
          <br />
          <br />
          <div>
            <p>
              <SmallDarkGreenBoldText>
                당신의 이름을 알려주세요 *
              </SmallDarkGreenBoldText>
            </p>
            <input
              type="text"
              value={userName}
              onChange={(e) => handleChange(e)}
            />
            <br />
            <br />

            <p>
              <SmallDarkGreenBoldText>랜덤 이름 생성</SmallDarkGreenBoldText>
            </p>
            <GreenButton
              onClick={(e) => {
                setRandomUserName();
              }}
            >
              두두에게
              <br /> 추천받기
            </GreenButton>
            <br />
            <br />
            <LongGreenButton
              onClick={(e) => {
                registerCompleteSubmit(e);
              }}
            >
              회원가입
            </LongGreenButton>
          </div>
        </>
      )}
    </div>
  );
}

export default RegisterForm;
