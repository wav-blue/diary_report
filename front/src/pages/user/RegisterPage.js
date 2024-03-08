import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../../components/form/RegisterForm";

function RegisterPage() {
  return (
    <div id="mainContainer">
      <h3>회원가입 페이지 </h3>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
