import React, { useState, useContext, useEffect } from "react";
import GoodsSelectCard from "./GoodsSelectCard";
import * as Api from "../../Api";
import { GreenBoldText } from "../../styles/style-components/text/BoldText";

function GoodsSelectBox(props) {
  const [goodsData, setGoodsData] = useState([]);

  const getSaleTitleData = async () => {
    const res = await Api.get(`title/sale`);
    setGoodsData(res.data);
  };

  // 판매 중인 상품 정보 setting
  useEffect(() => {
    getSaleTitleData();
  }, []);

  return (
    <>
      {goodsData.map(function (data) {
        return (
          <GoodsSelectCard
            titleId={data.titleId}
            titleName={data.titleName}
            titlePrice={data.titlePrice}
            titleDescription={data.titleDescription}
            setSelected={props.setSelected}
          />
        );
      })}
      <GreenBoldText>
        {props.selected.titleId && (
          <a>{props.selected.titleName}를 선택했어요!</a>
        )}
      </GreenBoldText>
      <p>
        {!props.selected.titleId && (
          <GreenBoldText>선택된 값이 없습니다.</GreenBoldText>
        )}
      </p>
    </>
  );
}
export default GoodsSelectBox;
