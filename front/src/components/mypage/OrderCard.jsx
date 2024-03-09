import { DateKorean } from "../common/DateKorean";
import React, { useState, useEffect } from "react";
import { DateTimeKorean } from "../common/DateTimeKorean";
import ContentContainer from "../../styles/style-components/component/ContentContainer";
import LightGreenCardContainer from "../../styles/style-components/component/LightGreenCardContainer";
import TitleContainer from "../../styles/style-components/component/TitleContainer";
import { SmallDarkGreenBoldText } from "../../styles/style-components/text/SmallBoldText";
import { StyleText } from "../../styles/style-components/text/StyleText";
import { SmallGreyButton } from "../../styles/style-components/button/SmallColorButton";

function OrderCard(props) {
  const [isComplete, setIsComplete] = useState(true);

  const { orderId, orderName, requestedAt, status, balanceAmount, method } =
    props.order;

  useEffect(() => {
    if (status === "WAITING_FOR_DEPOSIT") {
      setIsComplete(false);
    }
  }, []);
  return (
    <>
      <LightGreenCardContainer>
        <ContentContainer>
          <p>
            <TitleContainer>
              <SmallDarkGreenBoldText>
                상품명: {`${orderName}  `}
              </SmallDarkGreenBoldText>
            </TitleContainer>
            <StyleText>
              <p>{orderId}</p>
              <p>결제 방법: {`${method}`}</p>
              <p>결제 금액: {`${balanceAmount}`}원</p>
              <p>현재 상태: {`${status}`}</p>
              <DateTimeKorean>{requestedAt}</DateTimeKorean>
              <a> 결제</a>
            </StyleText>
          </p>
        </ContentContainer>
        {setExtra(method)}
      </LightGreenCardContainer>
    </>
  );

  function setExtra(method) {
    if (!isComplete) {
      if (method === "가상계좌") {
        return (
          <>
            {!isComplete && (
              <div>
                아직 결제가 완료되지 않았습니다!
                <SmallGreyButton
                  onClick={(e) => {
                    props.setModal({ orderId, method });
                  }}
                >
                  가상계좌 확인
                </SmallGreyButton>
              </div>
            )}
          </>
        );
      } else {
        return (
          <>
            <p>완료되지 않은 결제입니다.</p>
          </>
        );
      }
    }
    if (isComplete) {
      if (method === "카드") {
        return (
          <>
            <div>
              완료된 결제입니다.
              <SmallGreyButton
                onClick={(e) => {
                  props.setModal({ orderId, method });
                }}
              >
                결제내용 확인
              </SmallGreyButton>
            </div>
          </>
        );
      }
    }
  }
}

export default OrderCard;
