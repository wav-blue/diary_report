import React from "react";

import RegisterForm from "../../components/form/RegisterForm";
import WhitePageContainer from "../../styles/style-components/pageContainer/WhitePageContainer";
import CenterContainer from "../../styles/style-components/pageContainer/CenterContainer";

function RegisterPage() {
  return (
    <CenterContainer>
      <WhitePageContainer>
        <RegisterForm />
      </WhitePageContainer>
    </CenterContainer>
  );
}

export default RegisterPage;
