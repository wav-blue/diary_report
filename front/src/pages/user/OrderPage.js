import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useReducer } from "react";
import * as Api from "../../Api";
import { GreenBorderButton } from "../../styles/style-components/button/BorderColorButton";
import OrderCard from "../../components/mypage/OrderCard";
import VirtualAccountDetailCard from "../../components/mypage/billingDetail/VirtualAccountDetailCard";
import BillingCardDetailCard from "../../components/mypage/billingDetail/BillingCardDetailCard";
import { DarkGreenBoldText } from "../../styles/style-components/text/BoldText";

function OrderPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [modal, setModal] = useState();
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const getUserOrder = async () => {
    await Api.get(`orders/my`)
      .then((res) => {
        setOrders(res.data);
        setIsFetchCompleted(true);
        return res.data;
      })
      .catch((err) => {
        if (err?.response.status === 401) {
          alert("로그인이 필요한 페이지입니다!");
          navigate("/login");
          return;
        } else {
          alert("서버 오류입니다! 나중에 다시 확인해주세요.");
        }
      });
  };

  useEffect(() => {
    if (!isFetchCompleted) {
      getUserOrder();
      return;
    }
  }, [isFetchCompleted]);

  if (!isFetchCompleted) {
    return <div>결제 내역을 불러오는 중입니다..</div>;
  }
  return (
    <>
      {modal && methodModal(modal.method)}
      <DarkGreenBoldText style={{ margin: "8px" }}>
        나의 주문 내역
      </DarkGreenBoldText>
      {orders.map((order) => {
        if (order.orderName)
          return <OrderCard order={order} setModal={setModal} />;
      })}
      {orders.length === 0 && <p>아직 주문한 내역이 없어요</p>}

      <GreenBorderButton onClick={() => navigate("/my")}>
        마이페이지로
      </GreenBorderButton>
    </>
  );

  function methodModal(method) {
    if (method === "가상계좌") {
      return (
        <VirtualAccountDetailCard orderId={modal.orderId} setModal={setModal} />
      );
    } else if (method === "카드") {
      return (
        <BillingCardDetailCard orderId={modal.orderId} setModal={setModal} />
      );
    }
  }
}

export default OrderPage;
