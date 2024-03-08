import { DateKorean } from "../common/DateKorean";
import React from "react";
import { DateTimeKorean } from "../common/DateTimeKorean";
import {
  DarkGreenText,
  GreenText,
  RedText,
} from "../../styles/style-components/text/ColorText";
import {
  DarkGreenBoldText,
  GreenBoldText,
  WhiteBoldText,
} from "../../styles/style-components/text/BoldText";
import ContentContainer from "../../styles/style-components/component/ContentContainer";
import LightGreenCardContainer from "../../styles/style-components/component/LightGreenCardContainer";
import TitleContainer from "../../styles/style-components/component/TitleContainer";

function TitleCard(props) {
  console.log(props.title);
  const { titleId, titleName, titleDescription, createdAt, titleType } =
    props.title;
  return (
    <>
      <LightGreenCardContainer>
        <TitleContainer>
          <DarkGreenBoldText>
            {`${titleId} : ` + `${titleName}`}
          </DarkGreenBoldText>
        </TitleContainer>
        <ContentContainer>
          <div>
            <p>{titleDescription}</p>
            <p>{setTitleType(titleType)}</p>
          </div>
          <p>
            <RedText>
              <DateTimeKorean>{createdAt}</DateTimeKorean>
            </RedText>
            <a> 획득</a>
          </p>
        </ContentContainer>
      </LightGreenCardContainer>
    </>
  );

  function setTitleType(type) {
    if (type === 2) {
      return (
        <>
          <p>구매로 획득했어요!</p>
        </>
      );
    } else {
      return (
        <>
          <p>활동으로 획득했어요!</p>
        </>
      );
    }
    return summary;
  }
}

export default TitleCard;
