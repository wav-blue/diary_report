import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoodsSelectBox from "../../payments/GoodsSelectBox";
import { GoodsData } from "../../../data/Goods";
import * as Api from "../../../Api";
import CustomerForm from "../../payments/CustomerForm";
import { GreenBorderButton } from "../../styled/button/BorderColorButton";

function PaymentsPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState({
    type: "",
    price: 0,
  });
  const [complete, setComplete] = useState();
  const [customer, setCustomer] = useState({
    customerName: "",
    customerEmail: "",
    customerMobilePhone: "",
  });

  const goodsData = GoodsData;

  async function completeForm() {
    if (!selected.type) {
      alert("상품이 선택되지 않았습니다!");
      return;
    } else if (!customer.customerEmail) {
      alert("결제 정보가 입력되지 않았습니다!");
      return;
    }

    const tosspaymentsApiKey = await getCustomerKey();

    if (!tosspaymentsApiKey) {
      return;
    }

    navigate("/payments/checkout", {
      state: {
        widgetClientKey: `${tosspaymentsApiKey.widgetClientKey}`,
        customerKey: `${tosspaymentsApiKey.customerKey}`,
        secretKey: `${tosspaymentsApiKey.secretKey}`,
        selectedGoods: `${selected.type}`,
        amountOfPayment: `${selected.price}`,
        customerName: customer.customerName,
        customerEmail: customer.customerEmail,
        customerMobilePhone: customer.customerMobilePhone,
      },
    });
  }
  async function getCustomerKey() {
    const tosspaymentsApiKey = await Api.get(
      `users/customer?type=${selected.type}`
    )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        if (err.response.status === 409) {
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
      <GoodsSelectBox
        goodsData={goodsData}
        selected={selected}
        setSelected={setSelected}
      />
      <GreenBorderButton
        onClick={() => {
          if (selected.type) {
            setComplete(true);
          } else {
            alert("상품을 선택해주세요!");
          }
        }}
      >
        다음으로
      </GreenBorderButton>
      {complete && (
        <CustomerForm setCustomer={setCustomer} completeForm={completeForm} />
      )}
    </>
  );
}

export default PaymentsPage;
