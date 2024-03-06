import React, { useState, useContext, useEffect } from "react";
import GoodsSelectCard from "./GoodsSelectCard";
import { GreenBorderButton } from "../styled-components/button/BorderColorButton";
import * as Api from "../../Api";

function GoodsSelectBox(props) {
  const goodsData = props.goodsData;

  return (
    <>
      {goodsData.map(function (data) {
        return (
          <GoodsSelectCard
            GoodsType={data.GoodsType}
            GoodsName={data.GoodsName}
            GoodsPrice={data.GoodsPrice}
            GoodsDescription={data.GoodsDescription}
            setSelected={props.setSelected}
          />
        );
      })}
      <p>{props.selected.type && <a>{props.selected.type}를 선택했어요!</a>}</p>
      <p>{!props.selected.type && <a>선택된 값이 없습니다.</a>}</p>
    </>
  );
}
export default GoodsSelectBox;
