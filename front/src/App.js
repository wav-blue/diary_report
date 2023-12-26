import React, { useState, useEffect, useReducer, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

import Header from "./components/Header";
import Main from "./components/Main";
import NotFoundPage from "./components/errors/NotFoundPage";
import Test from "./components/Test";
import ReportPage from "./components/ReportPage";
import { loginReducer } from "./reducer";

function App() {
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  });
  return (
    <DispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" exact element={<Main />} />
            <Route path="/test" exact element={<Test />} />
            <Route path="/report" exact element={<ReportPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </UserStateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
