import { DateKorean } from "../common/DateKorean";
import DiaryContainer from "../../styles/style-components/component/DiaryContainer";
import React, { useState, useContext, useEffect } from "react";
import deleteDiary from "./utils/deleteDiary";
import getAnalysis from "./utils/getAnalysis";
import { LongGreenButton } from "../../styles/style-components/button/LongColorButton";
import { SmallGreyButton } from "../../styles/style-components/button/SmallColorButton";
import { SmallDarkGreyText } from "../../styles/style-components/text/SmallText";

function DiaryCard(props) {
  return (
    <>
      <DiaryContainer>
        <DateKorean>{props.date}</DateKorean>
        <div>
          <p>{setSummary(props.summary, props.status)}</p>
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

  function setSummary(summary, status) {
    if (!summary) {
      // fail
      if (status == -1) {
        return (
          <>
            <p>{props.content.substr(0, 50)} ...</p>
            <SmallDarkGreyText>분석에 실패했습니다 </SmallDarkGreyText>
            <SmallGreyButton onClick={() => getAnalysis(props.diaryId)}>
              다시 요청하기
            </SmallGreyButton>
          </>
        );
      } else {
        //loading
        return (
          <>
            <p>{props.content.substr(0, 50)} ...</p>
            <SmallDarkGreyText>분석 중입니다 </SmallDarkGreyText>
          </>
        );
      }
    }
    return summary;
  }
}

export default DiaryCard;
