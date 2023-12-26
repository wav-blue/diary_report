import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";

import * as Api from "../../Api";

function ReportForm() {
  const [username, setUsername] = useState("기본 닉네임");
  const [score, setScore] = useState([5, 5, 5]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("요청 시도");
    try {
      // "user" 엔드포인트로 post요청
      const res = await Api.post("user/score", {
        score,
      });
      console.log("응답: ", res);
    } catch (err) {
      console.log("요청에 실패하였습니다.\n", err);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <div>{username}님의 하루 어떠셨나요?</div>
      <div>
        <h5>식사</h5> <div>{score[0]}</div>
      </div>
      <div>
        <h5>수면</h5> <div>{score[1]}</div>
      </div>
      <div>
        <h5>일상 만족도</h5> <div>{score[2]}</div>
      </div>
      <button type="submit">제출</button>
    </Form>
  );
}

export default ReportForm;
