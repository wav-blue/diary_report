import React, { useState, useEffect, useReducer, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as Api from "./Api.js";

import "./CSS/App.css";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

import Header from "./components/Header";
import Main from "./components/Main";
import NotFoundPage from "./components/errors/NotFoundPage";
import Test from "./components/Test";
import InputPage from "./components/pages/InputPage";
import DiaryPage from "./components/pages/DiaryPage";
import { loginReducer } from "./reducer";
import LoginPage from "./components/LoginPage";

function App() {
  const [userState, dispatch] = useReducer(loginReducer, {
    user_id: null,
  });

  //--------------------------------------
  // 토큰 여부 확인 후 유저 상태 변경
  // 아래의 fetchCurrentUser 함수가 실행된 다음에 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면 isFetchCompleted 가 true여야 컴포넌트가 구현됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const refreshToken = sessionStorage.getItem("refreshToken");

      if (refreshToken) {
        console.log("refresh >. ", { accessToken, refreshToken });
        await Api.post(
          "accessToken",
          { accessToken, refreshToken },
          true,
          "application/json"
        );
      }
      const res = await Api.get("current");
      console.log("refreshToken res : ", res);
      // 유저 정보는 response의 data임.
      const user = res.data;
      console.log("유저 정보: ", user);
      // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN",
        payload: { user_id: user.user_id, user_name: user.user_name },
      });

      console.log("%c 쿠키에 토큰 있음.", "color: #d93d1a;");
    } catch {
      console.log("%c 쿠키에 토큰 없음.", "color: #d93d1a;");
    }
    // fetchCurrentUser 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
    setIsFetchCompleted(true);
  };

  // useEffect함수를 통해 fetchCurrentUser 함수를 실행함.
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!isFetchCompleted) {
    return "loading...";
  }
  //--------------------------------------

  return (
    <DispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" exact element={<Main />} />
            <Route path="/test" exact element={<Test />} />
            <Route path="/login" exact element={<LoginPage />} />
            <Route path="/diary" exact element={<DiaryPage />} />
            <Route path="/diary/edit" exact element={<InputPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </UserStateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
