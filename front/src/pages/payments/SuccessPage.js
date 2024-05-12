import { useState, useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GreenButton } from "../../styles/style-components/button/ColorButton";
import * as Api from "../../Api";
import { UserStateContext } from "../../App";

export function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userState = useContext(UserStateContext);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const [orderInfo, setOrderInfo] = useState({
    orderId: "",
    orderPrice: 0,
    orderName: "",
  });

  const requestData = {
    orderId: searchParams.get("orderId"),
    amount: searchParams.get("amount"),
    paymentKey: searchParams.get("paymentKey"),
  };

  useEffect(() => {
    if (!isFetchCompleted) {
      paymentsConfirm();
    }
    return () => {
      rendorSuccessPage();
    };
  }, [isFetchCompleted]);

  if (!isFetchCompleted) {
    return <div>결제 정보를 불러오는 중입니다...</div>;
  }

  async function rendorSuccessPage() {
    console.log("rendoring!!");
  }

  return (
    <div className="result wrapper">
      <div className="box_section">
        <h2 style={{ padding: "20px 0px 10px 0px" }}>
          <img
            width="35px"
            src="https://static.toss.im/3d-emojis/u1F389_apng.png"
          />
          결제에 성공했습니다!
        </h2>
        <p>{`주문 번호: ${orderInfo.orderId}`}</p>
        <p>{`주문명: ${orderInfo.orderName}`}</p>
        <p>{`결제 금액: ${orderInfo.orderPrice.toLocaleString()}원`}</p>
        <div className="result wrapper">
          <GreenButton onClick={() => navigate("/my/order")}>
            결제내역 보기
          </GreenButton>
          <GreenButton
            onClick={() => {
              navigate("/");
            }}
          >
            메인으로
          </GreenButton>
        </div>
      </div>
    </div>
  );

  async function paymentsConfirm() {
    let secretKey;
    // 서버에서 secretKey 조회
    try {
      const res = await Api.get(`payments/secretKey`);
      secretKey = res.data?.secretKey;
    } catch (err) {
      alert("서버에서 필요한 데이터를 얻지 못했습니다.\n나중에 시도해주세요.");
      const code = "server error";
      const message = "서버에서 필요한 데이터를 얻지 못했습니다.";
      navigate(`/payments/fail?code=${code}&message=${message}`);
      return;
    }

    // 토스페이먼츠 API 인증 (비밀번호 사용하지 않음)
    const encryptedSecretKey = `Basic ${btoa(secretKey + ":")}`;

    // paymentKey에 해당하는 결제를 검증하고 승인
    const response = await fetch(
      "https://api.tosspayments.com/v1/payments/confirm",
      {
        method: "POST",
        headers: {
          Authorization: encryptedSecretKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );

    const json = await response.json();
    console.log("json : ", json);

    // 구매 실패
    if (!response.ok) {
      failConfirm(json.code, json.message);
    }

    const method = json.method;
    console.log("method: ", method);
    // 구매 성공(가상계좌)
    if (method === "가상계좌") {
      await successConfirmVirtualAccount(json);
    }

    // 구매 성공(카드)
    if (method === "카드") {
      await successConfirmCard(json);
    }
    setIsFetchCompleted(true);
  }

  async function failConfirm(code, message) {
    navigate(`/payments/fail?code=${code}&message=${message}`);
    return;
  }

  async function successConfirmVirtualAccount(json) {
    const orderJson = {
      orderId: json.orderId,
      mId: json.mId,
      orderName: json.orderName,
      status: json.status,
      requestedAt: json.requestedAt,
      totalAmount: json.totalAmount,
      balanceAmount: json.balanceAmount,
      method: json.method,
      approvedAt: json.approvedAt,
      vat: json.vat,
      currency: json.currency,
    };

    const body = {
      orderJson,
      virtualAccountJson: json.virtualAccount,
    };

    // 구매 완료 비즈니스 로직
    await Api.post(
      `payments/success/${
        userState.userId
      }/virtualAccount?titleId=${searchParams.get("titleId")}`,
      body
    )
      .then((res) => {
        setOrderInfo({
          orderId: json.orderId,
          orderPrice: json.balanceAmount,
          orderName: json.orderName,
        });
      })
      .catch((err) => {
        alert(`결제 실패\n다시 시도해주세요.`);
        failConfirm("SERVER_ERROR", "서버 에러가 발생했습니다.");
      });
  }

  async function successConfirmCard(json) {
    const orderJson = {
      orderId: json.orderId,
      mId: json.mId,
      orderName: json.orderName,
      status: json.status,
      requestedAt: json.requestedAt,
      totalAmount: json.totalAmount,
      balanceAmount: json.balanceAmount,
      method: json.method,
      approvedAt: json.approvedAt,
      vat: json.vat,
      currency: json.currency,
    };

    const billingCardJson = {
      amount: json.card.amount,
      number: json.card.number,
      installmentPlanMonths: json.card.installmentPlanMonths,
      cardType: json.card.cardType,
      ownerType: json.card.ownerType,
      acquireStatus: json.card.acquireStatus,
    };

    const body = {
      orderJson,
      billingCardJson,
    };

    // 구매 완료 비즈니스 로직
    await Api.post(
      `payments/success/${
        userState.userId
      }/billingCard?titleId=${searchParams.get("titleId")}`,
      body
    )
      .then((res) => {
        setOrderInfo({
          orderId: json.orderId,
          orderPrice: json.balanceAmount,
          orderName: json.orderName,
        });
      })
      .catch((err) => {
        alert(`결제 실패\n다시 시도해주세요.`);
        failConfirm("SERVER_ERROR", "서버 에러가 발생했습니다.");
      });
  }
}
