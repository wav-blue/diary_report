import { DateKorean } from "../common/DateKorean";
import React from "react";
import TitleCardContainer from "../../styles/style-components/component/TitleCardContainer";

function TitleCard(props) {
  const { titleId, titleName, titleDescription, titlePrice, titleType } =
    props.title;
  return (
    <>
      <TitleCardContainer>
        <div>
          <p>{`${titleId} : ` + `${titleName}`}</p>
        </div>
        <div>
          <div>
            <p>{titleDescription}</p>
            <p>{setTitleType(titleType)}</p>
          </div>
        </div>
        <DateKorean>{props.createdAt}</DateKorean>
      </TitleCardContainer>
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
