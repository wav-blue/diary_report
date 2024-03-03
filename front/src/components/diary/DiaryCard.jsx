import { DateKorean } from "../common/DateKorean";
import DiaryContainer from "../styled/component/DiaryContainer";
import React, { useState, useContext, useEffect } from "react";
import deleteDiary from "./deleteDiary";
import getAnalysis from "./getAnalysis";
import { LongGreenButton } from "../styled/button/LongColorButton";
import { SmallGreyButton } from "../styled/button/SmallColorButton";
import { SmallDarkGreyText } from "../styled/text/SmallText";

function DiaryCard(props) {
  return (
    <>
      <DiaryContainer>
        <DateKorean>{props.date}</DateKorean>
        <div>
          <p>{setSummary(props.summary)}</p>
        </div>
        <div>
          <label> 만족도 </label>
          <a>{"★".repeat(props.satisfy)}점</a>
        </div>
        <LongGreenButton
          onClick={(e) => {
            props.setModal({
              date: props.date,
              content: props.content,
            });
          }}
        >
          읽기
        </LongGreenButton>
        <LongGreenButton
          onClick={() => {
            deleteDiary(props.diaryId);
          }}
        >
          삭제
        </LongGreenButton>
      </DiaryContainer>
    </>
  );

  function setSummary(summary) {
    if (summary === "fail") {
      return (
        <>
          <p>{props.content.substr(0, 50)} ...</p>
          <SmallDarkGreyText>분석에 실패했습니다 </SmallDarkGreyText>
          <SmallGreyButton onClick={() => getAnalysis(props.diaryId)}>
            다시 요청하기
          </SmallGreyButton>
        </>
      );
    }
    return summary;
  }
}

export default DiaryCard;
