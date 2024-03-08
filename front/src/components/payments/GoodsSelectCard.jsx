import React from "react";
import { SmallGreyButton } from "../../styles/style-components/button/SmallColorButton";

function GoodsSelectCard(props) {
  return (
    <>
      <div>
        <div>
          <p>상품명: {props.titleName}</p>
        </div>
        <div>
          <p>상품 가격: {props.titlePrice}</p>
        </div>
        <div>
          <p>설명: {props.titleDescription}</p>
        </div>
        <SmallGreyButton
          value={props.GoodsType}
          onClick={(e) => {
            props.setSelected({
              titleId: props.titleId,
              titleName: props.titleName,
              titlePrice: props.titlePrice,
            });
          }}
        >
          선택
        </SmallGreyButton>
      </div>
    </>
  );
}
export default GoodsSelectCard;
