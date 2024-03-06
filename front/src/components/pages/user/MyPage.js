import { useNavigate } from "react-router-dom";
import { GreenBorderButton } from "../../styled-components/button/BorderColorButton";

function MyPage() {
  const navigate = useNavigate();
  return (
    <>
      <p>두두의 친구</p>
      <p>
        두두에게 커피를 사주고 [두두의 친구] 칭호를 얻어보세요!
        <br />
      </p>

      <GreenBorderButton onClick={() => navigate("/my/payments")}>
        두두를 돕는다
      </GreenBorderButton>
    </>
  );
}

export default MyPage;
