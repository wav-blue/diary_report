import React, { useState, useEffect, useReducer, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

import Header from "./components/Header";
import Main from "./components/Main";
import NotFoundPage from "./components/errors/NotFoundPage";
import Test from "./components/Test";
import DiaryPage from "./components/DiaryPage";
import { loginReducer } from "./reducer";
import LoginPage from "./components/LoginPage";

function App() {
  const [userState, dispatch] = useReducer(loginReducer, {
    user_id: null,
  });

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
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </UserStateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
