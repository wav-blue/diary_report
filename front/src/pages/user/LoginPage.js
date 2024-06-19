import LoginForm from "../../components/form/LoginForm";
import CenterContainer from "../../styles/style-components/pageContainer/CenterContainer";
import WhitePageContainer from "../../styles/style-components/pageContainer/WhitePageContainer";

function LoginPage() {
  return (
    <CenterContainer>
      <WhitePageContainer>
        <LoginForm />
      </WhitePageContainer>
    </CenterContainer>
  );
}

export default LoginPage;
