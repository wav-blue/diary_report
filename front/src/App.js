import React, { useState, useEffect, useReducer, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as Api from "./Api.js";
import "../src/styles/styles.css";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

import Header from "./components/common/Header";
import MainPage from "./components/pages/MainPage";
import DiaryPage from "./components/pages/DiaryPage";
import IntroPage from "./components/pages/IntroPage";
import LoginPage from "./components/pages/LoginPage";
import DiaryEditPage from "./components/pages/DiaryEditPage";
import { loginReducer } from "./reducer";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme.js";
import RegisterPage from "./components/pages/RegisterPage.js";
import { ErrorBoundary } from "./errorBoundary/ErrorBoundary.jsx";
import NotFoundPage from "./components/pages/errors/NotFoundPage.js";
import MyPage from "./components/pages/user/MyPage.js";
import PaymentsPage from "./components/pages/payments/PaymentsPage.js";
import { SuccessPage } from "./components/pages/payments/SuccessPage.js";
import { FailPage } from "./components/pages/payments/FailPage.js";
import { CheckoutPage } from "./components/pages/payments/CheckoutPage.js";

function App() {
  const [userState, dispatch] = useReducer(loginReducer, {
    userId: null,
  });

  const refreshAccessToken = async () => {
    try {
      const refreshToken = sessionStorage.getItem("refreshToken");
      const body = {
        refreshToken,
      };
      const res = await Api.post(
        "/users/accessToken",
        body,
        0,
        "application/json"
      );
      if (res.status === 200) {
        // 재발급 성공
        console.log("재발급 성공");
      }
    } catch (err) {
      if (err?.response?.status === 401) {
        // refresh token 만료
        alert("다시 로그인해주세요");
        //navigate('/login')
      }
    }
  };

  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const fetchCurrentUser = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const refreshToken = sessionStorage.getItem("refreshToken");

      // accessToken이 존재하지 않는 경우
      if (!accessToken && refreshToken) {
        console.log("accessToken 재발급 실행 > ");
        const body = {
          accessToken,
          refreshToken,
        };
        await Api.post("accessToken", { accessToken, refreshToken });
      }
      const res = await Api.get("users/current");
      console.log("refreshToken res : ", res);
      // 유저 정보는 response의 data임.
      const user = res.data;
      console.log("user정보 > ", user);
      // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN",
        payload: { userId: user.userId, userName: user.userName },
      });

      console.log("%c Access Token 인증 성공.", "color: #d93d1a;");
    } catch {
      console.log("%c Access Token 인증 실패.", "color: #d93d1a;");
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
    <ErrorBoundary>
      <DispatchContext.Provider value={dispatch}>
        <ThemeProvider theme={theme}>
          <UserStateContext.Provider value={userState}>
            <Router>
              <Header />
              <Routes>
                <Route path="/" exact element={<MainPage />} />
                <Route path="/intro" exact element={<IntroPage />} />
                <Route path="/login" exact element={<LoginPage />} />
                <Route path="/register" exact element={<RegisterPage />} />
                <Route path="/diary" exact element={<DiaryPage />} />
                <Route path="/diary/edit" exact element={<DiaryEditPage />} />
                <Route path="/my" exact element={<MyPage />} />
                <Route path="/my/payments" exact element={<PaymentsPage />} />
                <Route
                  path="/payments/checkout"
                  exact
                  element={<CheckoutPage />}
                />
                <Route
                  path="/payments/success"
                  exact
                  element={<SuccessPage />}
                />
                <Route path="/payments/fail" exact element={<FailPage />} />
                <Route path="/*" element={<NotFoundPage />} />
              </Routes>
            </Router>
          </UserStateContext.Provider>
        </ThemeProvider>
      </DispatchContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
