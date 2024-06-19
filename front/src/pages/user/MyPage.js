import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useReducer } from "react";
import * as Api from "../../Api";
import { GreenBorderButton } from "../../styles/style-components/button/BorderColorButton";
import TitleCard from "../../components/mypage/TitleCard";
import WhitePageContainer from "../../styles/style-components/pageContainer/WhitePageContainer";
import { DarkGreenBoldText } from "../../styles/style-components/text/BoldText";
import CenterContainer from "../../styles/style-components/pageContainer/CenterContainer";

function MyPage() {
  const navigate = useNavigate();
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    getUserTitle();
  }, []);

  const getUserTitle = async () => {
    await Api.get(`title/my`)
      .then((res) => {
        setTitles(res.data);
        return res.data;
      })
      .catch((err) => {
        if (err?.response.status === 401) {
          alert("로그인이 필요한 페이지입니다!");
          navigate("/login");
          return;
        } else {
          alert(
            "마이페이지에 접근할 수 없습니다.\n페이지를 새로고침 해주세요."
          );
        }
      });
  };

  return (
    <CenterContainer>
      <WhitePageContainer>
        <DarkGreenBoldText>칭호 목록</DarkGreenBoldText>
        {titles.map((title) => {
          return <TitleCard title={title} />;
        })}
        {titles.length === 0 && <p>아직 획득한 칭호가 없습니다</p>}

        <GreenBorderButton onClick={() => navigate("/my/order")}>
          나의 결제내역
        </GreenBorderButton>

        <DarkGreenBoldText>두두의 친구</DarkGreenBoldText>
        <p>
          두두에게 커피를 사주고 [두두의 친구] 칭호를 얻어보세요!
          <br />
        </p>

        <GreenBorderButton onClick={() => navigate("/my/payments")}>
          두두를 돕는다
        </GreenBorderButton>
      </WhitePageContainer>
    </CenterContainer>
  );
}

export default MyPage;
