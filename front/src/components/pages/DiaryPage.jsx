import React, { useContext, useState, useEffect } from "react";
import * as Api from "../../Api";
import { UserStateContext } from "../../App";
import DiaryCard from "../diary/DiaryCard";
import { useNavigate } from "react-router-dom";

function DiaryPage() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const { user_id } = userState;

  // useState 훅을 통해 users 상태를 생성함.
  const [diarys, setDiarys] = useState();

  console.log("diarys 값>>>", diarys);
  useEffect(() => {
    Api.get(`${user_id}/diary`).then((res) => setDiarys(res.data));

    console.log("res dairys: ", diarys);
  }, [userState, navigate]);

  if (!diarys) {
    return <div>표시할 내용이 없습니다!</div>;
  }

  return diarys.map((diary) => (
    <DiaryCard
      date={diary.date}
      meal={diary.meal}
      sleep={diary.sleep}
      activity={diary.activity}
      satisfaction={diary.satisfaction}
      comment={diary.comment}
    />
  ));
}

export default DiaryPage;
