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
    const customerKey = await getCustomerKey();
    console.log("customerKey > ", customerKey);
    console.log("customer > ", customer);
    if (!customerKey) {
      alert("서버에서 결제 정보를 얻을 수 없습니다!");
    }
    if (!selected.type) {
      alert("상품이 선택되지 않았습니다!");
    }
    if (!customer.customerEmail) {
      alert("결제 정보가 입력되지 않았습니다!");
      return;
    }

    navigate("/payments/checkout", {
      state: {
        widgetClientKey: `${customerKey.widgetClientKey}`,
        customerKey: `${customerKey.customerKey}`,
        selectedGoods: `${selected.type}`,
        amountOfPayment: `${selected.price}`,
        customerName: customer.customerName,
        customerEmail: customer.customerEmail,
        customerMobilePhone: customer.customerMobilePhone,
      },
    });
  }
  async function getCustomerKey() {
    const customerKey = await Api.get(`payments/customer`)
      .then((res) => {
        console.log("res.data 변수 확인 : ", res.data);
        return res.data;
      })
      .catch((err) => {
        alert(`서버 오류! ${err?.message}`);
      });
    return customerKey;
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
