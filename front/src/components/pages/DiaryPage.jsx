import React, { useContext, useState, useEffect } from "react";
import * as Api from "../../Api";
import { UserStateContext } from "../../App";
import DiaryCard from "../diary/DiaryCard";
import { useNavigate } from "react-router-dom";

function DiaryPage() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const userId = "01HJKR4QXTRA8E4KXFJWGCEAS8";

  // useState 훅을 통해 users 상태를 생성함.
  const [diarys, setDiarys] = useState({
    date: "2023-12-29",
    meal: "5",
    sleep: "2",
    activity: "4",
    satisfaction: "5",
    comment: "테스트 코멘트.",
  });

  console.log("diarys 값>>>", diarys);
  useEffect(() => {
    //Api.get(`userId/diary`).then((res) => setDiarys(res.data));

    console.log("res dairys: ", diarys);
  }, [userState, navigate]);

  return (
    <div>
      <DiaryCard
        date={diarys.date}
        meal={diarys.meal}
        sleep={diarys.sleep}
        activity={diarys.activity}
        satisfaction={diarys.satisfaction}
        comment={diarys.comment}
      />
    </div>
  );
}

export default DiaryPage;
