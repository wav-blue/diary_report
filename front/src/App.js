import React, { useState, useEffect, useReducer, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import * as Api from "./Api.js";
import "../src/styles/styles.css";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

import { loginReducer } from "./reducer";
import { ErrorBoundary } from "./errorBoundary/ErrorBoundary.jsx";

import Header from "./components/common/Header";

import sessionStorageAccessToken from "./utils/login/sessionStorageAccessToken.js";
import sessionStorageExpireToken from "./utils/login/sessionStorageExpireToken.js";

import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme.js";
import CustomBody from "./styles/style-components/CustomBody.jsx";
import Footer from "./components/common/Footer.jsx";
import MainPage from "./pages/MainPage.js";
import IntroPage from "./pages/IntroPage.js";
import LoginPage from "./pages/user/LoginPage.js";
import RegisterPage from "./pages/user/RegisterPage.js";
import DiaryPage from "./pages/Diary/DiaryPage.js";
import DiaryEditPage from "./pages/Diary/DiaryEditPage.js";
import MyPage from "./pages/user/MyPage.js";
import PaymentsPage from "./pages/payments/PaymentsPage.js";
import { CheckoutPage } from "./pages/payments/CheckoutPage.js";
import { SuccessPage } from "./pages/payments/SuccessPage.js";
import { FailPage } from "./pages/payments/FailPage.js";
import NotFoundPage from "./pages/errors/NotFoundPage.js";
import OrderPage from "./pages/user/OrderPage.js";
import BackgroundBody from "./styles/style-components/BackgroundBody.jsx";

function App() {
  const [userState, dispatch] = useReducer(loginReducer, {
    userId: null,
  });

  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  // fetchCurrentUser 함수 실행
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    const accessToken = sessionStorageAccessToken();

    // 토큰이 존재하지 않으므로 아무것도 하지 않음
    if (!accessToken) {
      setIsFetchCompleted(true);
      return;
    }

    try {
      const res = await Api.get("users/current");
      // 유저 정보
      const user = res.data;

      // dispatch 함수 - 로그인 성공 상태
      dispatch({
        type: "LOGIN",
        payload: { userId: user.userId, userName: user.userName },
      });

      console.log("%c Access Token 인증 성공.", "color: #d93d1a;");
    } catch (err) {
      // 419 : Token Expired
      if (err.response?.status === 419) {
        console.log("%c Access Token 재발급 실행.", "color: #d93d1a;");
        reissueAccessToken();
      } else if (err?.response?.status === 401) {
        alert("유효하지 않은 토큰입니다.");
        // 토큰 삭제
        sessionStorageExpireToken();
      }
    }
    // fetchCurrentUser 과정 종료
    setIsFetchCompleted(true);
  };

  const reissueAccessToken = async () => {
    const accessToken = sessionStorageAccessToken();

    const body = {
      accessToken,
    };
    try {
      const res = await Api.post("users/accessToken", body);

      // Response
      const { accessToken, userId, userName } = res.data;
      sessionStorage.setItem("accessToken", accessToken);

      // Login Success
      dispatch({
        type: "LOGIN",
        payload: { userId, userName },
      });
    } catch (err) {
      sessionStorageExpireToken();

      if (err?.response?.status === 419) {
        // refresh token Expired
        alert("인증 정보가 만료되었습니다.\n다시 로그인해주세요.");
      } else if (err?.response?.status === 401) {
        alert("유효하지 않은 토큰입니다.");
      }
      // Remove Token
      sessionStorageExpireToken();
    }
  };

  if (!isFetchCompleted) {
    return <div>유저 정보를 불러오는 중입니다...</div>;
  }
  //--------------------------------------

  return (
    <ErrorBoundary>
      <DispatchContext.Provider value={dispatch}>
        <ThemeProvider theme={theme}>
          <UserStateContext.Provider value={userState}>
            <Router>
              <Header />
              <BackgroundBody>
                <CustomBody>
                  <Routes>
                    <Route path="/" exact element={<MainPage />} />
                    <Route path="/intro" exact element={<IntroPage />} />
                    <Route path="/login" exact element={<LoginPage />} />
                    <Route path="/register" exact element={<RegisterPage />} />
                    <Route path="/diary" exact element={<DiaryPage />} />
                    <Route
                      path="/diary/new"
                      exact
                      element={<DiaryEditPage />}
                    />
                    <Route path="/my" exact element={<MyPage />} />
                    <Route path="/my/order" exact element={<OrderPage />} />
                    <Route
                      path="/my/payments"
                      exact
                      element={<PaymentsPage />}
                    />
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
                </CustomBody>
              </BackgroundBody>
              <Footer />
            </Router>
          </UserStateContext.Provider>
        </ThemeProvider>
      </DispatchContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
