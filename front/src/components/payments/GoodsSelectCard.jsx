import React, { useState, useContext, useEffect } from "react";
import { SmallGreyButton } from "../styled/button/SmallColorButton";

function GoodsSelectCard(props) {
  return (
    <>
      <div>
        <div>
          <p>상품명: {props.GoodsName}</p>
        </div>
        <div>
          <p>상품 가격: {props.GoodsPrice}</p>
        </div>
        <div>
          <p>설명: {props.GoodsDescription}</p>
        </div>
        <SmallGreyButton
          value={props.GoodsType}
          onClick={(e) => {
            props.setSelected({
              type: props.GoodsType,
              price: props.GoodsPrice,
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
