import React, { useState, useContext, useEffect } from "react";
import GoodsSelectCard from "./GoodsSelectCard";
import * as Api from "../../Api";
import { SmallRedBoldText } from "../../styles/style-components/text/SmallBoldText";

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
      <SmallRedBoldText>
        {props.selected.titleId && (
          <a>{props.selected.titleName}를 선택했어요!</a>
        )}
      </SmallRedBoldText>
      <p>
        {!props.selected.titleId && (
          <SmallRedBoldText>선택된 상품이 없습니다.</SmallRedBoldText>
        )}
      </p>
    </>
  );
}
export default GoodsSelectBox;
