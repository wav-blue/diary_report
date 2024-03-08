import React, { useState } from "react";
import { GreenBorderButton } from "../../styles/style-components/button/BorderColorButton";

function CustomerForm(props) {
  const [customerName, setCustomerName] = useState();
  const [customerEmail, setCustomerEmail] = useState();
  const [customerMobilePhone, setCustomerMobilePhone] = useState();

  const handleChange = (e) => {
    if (e.target.name === "customerName") {
      setCustomerName(e.target.value);
    }
    if (e.target.name === "customerEmail") {
      setCustomerEmail(e.target.value);
    }
    if (e.target.name === "customerMobilePhone") {
      setCustomerMobilePhone(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    props.completeForm(customerName, customerEmail, customerMobilePhone);

    if (!customerName || !customerEmail || !customerMobilePhone) {
      alert("정보가 입력되지 않았습니다!");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>결제 정보 입력</div>
      <p>결제를 위한 정보를 입력합니다.</p>
      <div>
        <h5>이름</h5>
        <input
          type="text"
          name="customerName"
          value={customerName}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <h5>이메일</h5>{" "}
        <input
          type="text"
          name="customerEmail"
          value={customerEmail}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <h5>전화번호</h5>{" "}
        <input
          type="text"
          name="customerMobilePhone"
          value={customerMobilePhone}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <GreenBorderButton type="submit">계속하기</GreenBorderButton>
    </form>
  );
}
export default CustomerForm;
