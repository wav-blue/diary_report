import { useEffect, useRef, useState } from "react";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";

import { useQuery } from "@tanstack/react-query";
import CenterContainer from "../../styles/style-components/pageContainer/CenterContainer";
import { PaymentButton } from "../../styles/style-components/button/PaymentButton";

const selector = "#payment-widget";

export function CheckoutPage() {
  const navigate = useNavigate();

  const location = useLocation();

  // 결제 정보
  const orderData = location.state;

  const {
    clientKey,
    customerKey,
    amountOfPayment,
    customerName,
    customerEmail,
    customerMobilePhone,
  } = orderData;

  const orderId = orderData.orderId;
  const titleId = orderData.selectedTitleId;
  const orderName = orderData.selectedTitleName;

  console.log("clientKey!!", clientKey);
  console.log("customerKey!!", customerKey);
  const { data: paymentWidget } = usePaymentWidget(clientKey, customerKey);
  const paymentMethodsWidgetRef = useRef(null);
  const [price, setPrice] = useState(amountOfPayment);

  useEffect(() => {
    if (paymentWidget == null) {
      return;
    }

    // ------  결제 UI 렌더링 ------
    // @docs https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      selector,
      { value: price },
      { variantKey: "DEFAULT" }
    );

    // ------  이용약관 UI 렌더링 ------
    // @docs https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자-옵션
    paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });

    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, [paymentWidget]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    // ------ 금액 업데이트 ------
    // @docs https://docs.tosspayments.com/reference/widget-sdk#updateamount결제-금액
    paymentMethodsWidget.updateAmount(price);
  }, [price]);

  return (
    <>
      <div className="wrapper">
        <div className="box_section">
          <div id="payment-widget" />
          <div id="agreement" />
          <div style={{ paddingLeft: "24px" }}>
            <div className="checkable typography--p">
              <label
                htmlFor="coupon-box"
                className="checkable__label typography--regular"
              ></label>
            </div>
          </div>
          <WhiteContainer className="result wrapper">
            <PaymentButton
              className="button"
              style={{ marginTop: "30px" }}
              onClick={async () => {
                // TODO: 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
                // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
                try {
                  // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
                  // @docs https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
                  await paymentWidget?.requestPayment({
                    orderId: orderId,
                    orderName: orderName,
                    customerName: customerName,
                    customerEmail: customerEmail,
                    customerMobilePhone: customerMobilePhone,
                    successUrl: `${window.location.origin}/payments/success?titleId=${titleId}`,
                    failUrl: `${window.location.origin}/payments/fail`,
                  });
                } catch (error) {
                  // 에러 처리하기
                  console.error(error);
                }
              }}
            >
              결제하기
            </PaymentButton>
            <PaymentButton
              className="button"
              style={{ marginTop: "30px" }}
              onClick={async () => {
                alert("결제가 취소되었습니다!");
                navigate("/");
              }}
            >
              취소하기
            </PaymentButton>
          </WhiteContainer>
        </div>
      </div>
    </>
  );
}

// function usePaymentWidget(clientKey: string, customerKey: string) {
function usePaymentWidget(clientKey, customerKey) {
  return useQuery({
    queryKey: ["payment-widget", clientKey, customerKey],
    queryFn: () => {
      // ------  결제위젯 초기화 ------
      // @docs https://docs.tosspayments.com/reference/widget-sdk#sdk-설치-및-초기화
      return loadPaymentWidget(clientKey, customerKey);
    },
  });
}
