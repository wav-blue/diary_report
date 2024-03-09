import { DateTimeKorean } from "../../common/DateTimeKorean";
import * as Api from "../../../Api";
import {
  ModalBackContainer,
  ModalContainer,
  ModalTextBox,
} from "../../../styles/style-components/component/ModalContainer";
import { useEffect, useState } from "react";

function VirtualAccountDetailCard(props) {
  const [detail, setDetail] = useState(null);
  const orderId = props.orderId;

  if (!orderId) {
    alert("주문 정보가 없습니다.");
    return <div>주문 정보가 없습니다.</div>;
  }

  async function getDetail(orderId) {
    Api.get(`billing/${orderId}/virtualAccount`)
      .then((res) => {
        console.log("res.data: ", res);
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
        {detail && <>{content("예금주", detail.customerName)}</>}
        <br />
        {detail && <>{content("입금 은행", detail.bankCode)}</>}
        {detail && <>{content("입금 계좌", detail.accountNumber)}</>}
        <br />
        {detail && <>{content("만료 여부", detail.expired)}</>}
        {detail && <>{content("환불 상태", detail.refundStatus)}</>}
        {detail && <>{dateContent("입금 기한", detail.dueDate)}</>}
      </>
    );
  }

  return (
    <ModalBackContainer>
      <ModalContainer>
        <ModalTextBox>
          <h3>가상계좌 정보</h3>
          <br />
          {renderPage()}
        </ModalTextBox>
        <button
          onClick={(e) => {
            props.setModal(null);
          }}
        >
          뒤로 가기
        </button>
      </ModalContainer>
    </ModalBackContainer>
  );
}

export default VirtualAccountDetailCard;
