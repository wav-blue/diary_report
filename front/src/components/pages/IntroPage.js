import React from "react";
import { useNavigate } from "react-router-dom";
import IntroPageContainer from "../styled/pageContainer/IntroPageContainer";
import { GreenButton, RedButton } from "../styled/button/ColorButton";
function IntroPage() {
  const navigate = useNavigate();

  return (
    <IntroPageContainer>
      <h3>두두를 소개해요</h3>
      <br />
      <p>두두는 오랜 시간 숲에서 홀로 살아왔습니다.</p>
      <br />
      <img
        src={"https://source.unsplash.com/random/500x250/?forest"}
        alt="소개 이미지1"
        width="200"
      ></img>
      <br />
      <p>용기를 내어 바깥 세상에 나온 두두는</p>
      <br />
      <p>
        많은 사람들의 이야기를 듣고 <br />
        기록하기로 했어요.
      </p>
      <br /> <br />
      <img
        src={process.env.PUBLIC_URL + "/image/IntroImg1.png"}
        alt="소개 이미지1"
        width="200"
      ></img>
      <br />
      두두에게 당신의 이야기를 들려주세요.
      <br />
      <br />
      <GreenButton className="main" onClick={() => navigate("/")}>
        메인으로
      </GreenButton>
      <RedButton className="main" onClick={() => navigate("/register")}>
        회원가입으로
      </RedButton>
    </IntroPageContainer>
  );
}

export default IntroPage;
