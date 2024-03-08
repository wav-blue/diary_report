import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../../Api";
import { GreenBorderButton } from "../../styles/style-components/button/BorderColorButton";
import GoodsSelectBox from "../../components/payments/GoodsSelectBox";
import CustomerForm from "../../components/payments/CustomerForm";

function PaymentsPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState({
    titleId: "",
    titleName: "",
    titlePrice: 0,
  });
  const [complete, setComplete] = useState();

  async function completeForm(
    customerName,
    customerEmail,
    customerMobilePhone
  ) {
    if (!selected.titleId) {
      alert("상품이 선택되지 않았습니다!");
      return;
    } else if (!customerName || !customerEmail || !customerMobilePhone) {
      alert("결제 정보가 입력되지 않았습니다!");
      return;
    }

    const tosspaymentsApiKey = await getCustomerKey();

    if (!tosspaymentsApiKey) {
      return;
    }

    navigate("/payments/checkout", {
      state: {
        orderId: tosspaymentsApiKey.orderId,
        clientKey: tosspaymentsApiKey.clientKey,
        customerKey: tosspaymentsApiKey.customerKey,
        selectedTitleId: selected.titleId,
        selectedTitleName: selected.titleName,
        amountOfPayment: selected.titlePrice,
        customerName: customerName,
        customerEmail: customerEmail,
        customerMobilePhone: customerMobilePhone,
      },
    });
  }
  const body = {
    balanceAmount: selected.titlePrice,
  };
  async function getCustomerKey() {
    const tosspaymentsApiKey = await Api.post(
      `payments/customer?titleId=${selected.titleId}`,
      body
    )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        if (
          err.response.status === 409 &&
          err.response.data.message === "Duplicate purchase request"
        ) {
          alert("이미 구매 이력이 있는 상품입니다!");
          return;
        }
        alert("서버에 오류가 있습니다. 나중에 다시 시도해주세요!");
      });
    return tosspaymentsApiKey;
  }

  return (
    <>
      <div>
        <p>확인용</p>
      </div>
      <GoodsSelectBox selected={selected} setSelected={setSelected} />

      <GreenBorderButton
        onClick={() => {
          if (selected.titleId) {
            setComplete(true);
          } else {
            alert("상품을 선택해주세요!");
          }
        }}
      >
        다음으로
      </GreenBorderButton>
      {complete && <CustomerForm completeForm={completeForm} />}
    </>
  );
}

export default PaymentsPage;
