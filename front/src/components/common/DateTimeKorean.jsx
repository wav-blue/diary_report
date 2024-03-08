import React, { useState } from "react";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/ko";

//한국시간으로 변경하는 로직
const changeUtcTimeToKst = (date) => {
  dayjs.extend(utc);
  dayjs.locale("ko");

  const dayjsDate = dayjs(date.children);
  if (dayjsDate.$H > 12) {
    dayjsDate.$H = dayjsDate.$H - 12;
    return dayjsDate.format("YYYY년 MM월 DD일 오후 HH시 mm분");
  }
  return dayjsDate.format("YYYY년 MM월 DD일 오전 HH시 mm분");
};

const DateTimeKorean = (props) => {
  return <a>{changeUtcTimeToKst(props)}</a>;
};
export { DateTimeKorean };
