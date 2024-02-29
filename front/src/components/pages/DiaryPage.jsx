import React, { useContext, useState, useEffect } from "react";
import * as Api from "../../Api";
import { UserStateContext } from "../../App";
import DiaryCard from "../diary/DiaryCard";
import { useNavigate } from "react-router-dom";

function DiaryPage() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const { userId } = userState;
  console.log("userId >> ", userId);

  // useState 훅을 통해 users 상태를 생성함.
  const [diarys, setDiarys] = useState();

  console.log("diarys 값>>>", diarys);
  useEffect(() => {
    Api.get(`diary/my`).then((res) => setDiarys(res.data));
  }, [userState, navigate]);

  if (!diarys) {
    return <div>표시할 내용이 없습니다!</div>;
  }

  return diarys.map((diary) => (
    <DiaryCard
      date={diary.created_at}
      summary={diary.summary}
      satisfy={diary.satisfy}
    />
  ));
}

export default DiaryPage;
