import React, { useContext, useState, useEffect } from "react";
import * as Api from "../../Api";
import { UserStateContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { BigGreenBorderButton } from "../../styles/style-components/button/BigBorderColorButton";
import DiaryDetailCard from "../../components/diary/DiaryDetailCard";
import DiaryCard from "../../components/diary/DiaryCard";

function DiaryPage() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);

  // useState 훅을 통해 users 상태를 생성함.
  const [diarys, setDiarys] = useState();
  const [modal, setModal] = useState(null);

  useEffect(() => {
    Api.get(`diary/my`)
      .then((res) => setDiarys(res.data))
      .catch((err) => {
        if (err.response?.status === 401) {
          alert("로그인이 필요한 페이지입니다!");
          navigate("/login");
        }
      });
  }, [userState, navigate]);

  if (!diarys) {
    return <div>표시할 내용이 없습니다!</div>;
  }

  return (
    <>
      {modal && <DiaryDetailCard modal={modal} setModal={setModal} />}
      <BigGreenBorderButton
        onClick={(e) => navigate("/diary/new")}
        style={{ display: "column" }}
      >
        오늘의 일기 작성
      </BigGreenBorderButton>

      {diarys.map((diary) => (
        <DiaryCard
          diaryId={diary.diary_id}
          date={diary.created_at}
          summary={diary.summary}
          satisfy={diary.satisfy}
          content={diary.content}
          status={diary.status}
          setModal={setModal}
        />
      ))}
    </>
  );
}

export default DiaryPage;
