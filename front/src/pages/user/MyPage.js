import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useReducer } from "react";
import * as Api from "../../Api";
import { GreenBorderButton } from "../../styles/style-components/button/BorderColorButton";
import TitleCard from "../../components/title/TitleCard";

//

function MyPage() {
  const navigate = useNavigate();
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    getUserTitle();
  }, []);

  const getUserTitle = async () => {
    await Api.get(`title/my`)
      .then((res) => {
        console.log(res.data);
        setTitles(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
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
    <>
      <p>칭호 목록</p>
      {titles.map((title) => {
        return <TitleCard title={title} />;
      })}
      {titles.length === 0 && <p>아직 획득한 칭호가 없습니다</p>}

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
