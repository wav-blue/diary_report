import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GreenButton } from "../../styles/style-components/button/ColorButton";
import * as Api from "../../Api";
import { UserStateContext } from "../../App";

export function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const userState = useContext(UserStateContext);

  useEffect(() => {
    paymentsConfirm();
  }, []);

  const paymentsConfirm = async () => {
    const requestData = {
      orderId: searchParams.get("orderId"),
      amount: searchParams.get("amount"),
      paymentKey: searchParams.get("paymentKey"),
    };

    let secretKey;
    try {
      const res = await Api.get(`payments/secretKey`);
      secretKey = res.data.secretKey;
    } catch (err) {
      alert("서버에서 필요한 데이터를 얻지 못했습니다.\n나중에 시도해주세요.");
      return;
    }

    // 토스페이먼츠 API 인증 (비밀번호 사용하지 않음)
    // @docs https://docs.tosspayments.com/reference/using-api/authorization#%EC%9D%B8%EC%A6%9D
    const encryptedSecretKey = `Basic ${btoa(secretKey + ":")}`;

    async function confirm() {
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

      if (!response.ok) {
        // 구매 실패 비즈니스 로직
        navigate(`payments/fail?code=${json.code}&message=${json.message}`);
        return;
      }

      const body = {
        orderId: json.orderId,
        mId: json.mId,
        requestedAt: json.requestedAt,
        status: json.status,
        balanceAmount: json.balanceAmount,
        method: json.method,
        orderName: json.orderName,
      };

      // 구매 완료 비즈니스 로직
      await Api.post(
        `payments/success/${userState.userId}?titleId=${searchParams.get(
          "titleId"
        )}`,
        body
      )
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          alert(
            `서버에 문제가 생겼습니다! 관리자에게 문의하세요.\n주문 번호: ${searchParams.get(
              "orderId"
            )}`
          );
        });
    }
    confirm();
  };

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
        <p>{`주문 번호: ${searchParams.get("orderId")}`}</p>
        <p>{`결제 금액: ${Number(
          searchParams.get("amount")
        ).toLocaleString()}원`}</p>
        <div className="result wrapper">
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
}
