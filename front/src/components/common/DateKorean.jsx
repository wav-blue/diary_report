import React, { useState } from "react";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/ko";

//한국시간으로 변경하는 로직
const changeUtcTimeToKst = (date) => {
  // 플러그인 사용
  dayjs.extend(utc);
  dayjs.locale("ko");

  return dayjs(date.children).format("YYYY년 MM월 DD일");
};

const DateKorean = (props) => {
  return <a>{changeUtcTimeToKst(props)}</a>;
};
export { DateKorean };
