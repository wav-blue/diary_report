import { DateTimeKorean } from "../../common/DateTimeKorean";
import * as Api from "../../../Api";

import { useEffect, useState } from "react";
import { ModalContainer } from "../../common/ModalContainer";

function BillingCardDetailCard(props) {
  const [detail, setDetail] = useState(null);
  const orderId = props.orderId;

  if (!orderId) {
    alert("주문 정보가 없습니다.");
    return <div>주문 정보가 없습니다.</div>;
  }

  async function getDetail(orderId) {
    Api.get(`billing/${orderId}/billingCard`)
      .then((res) => {
        setDetail(res.data);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          alert("열람 권한이 없습니다!");
          navigate("/login");
        }
      });
  }

  useEffect(() => {
    getDetail(orderId);
  }, []);

  function content(column, content) {
    if (!content) content = "해당 없음";
    return (
      <p>
        <b>{column}</b> {content}
      </p>
    );
  }

  function dateContent(column, content) {
    return (
      <p>
        <b>{column}</b> <DateTimeKorean>{content}</DateTimeKorean>
      </p>
    );
  }

  function renderPage() {
    return (
      <>
        {detail && <>{content("주문 번호", detail.orderId)}</>}
        <br />
        {detail && <>{content("할부", detail.installmentPlanMonths)}</>}
        {detail && (
          <>{content("결제 카드", detail.cardType + " " + detail.number)}</>
        )}
        <br />
        {detail && <>{content("카드 매입 상태", detail.acquireStatus)}</>}
        {detail && <>{content("카드 소유자", detail.ownerType)}</>}
        <br />

        {detail && <>{content("결제 금액", detail.amount + "원")}</>}
      </>
    );
  }

  return (
    <ModalContainer
      title={"결제 상세 정보"}
      detail={renderPage()}
      setModal={props.setModal}
    />
  );
}

export default BillingCardDetailCard;
