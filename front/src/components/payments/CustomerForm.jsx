import React, { useState } from "react";
import { GreenBorderButton } from "../../styles/style-components/button/BorderColorButton";
import { SmallDarkGreenBoldText } from "../../styles/style-components/text/SmallBoldText";
import { SmallDarkGreyText } from "../../styles/style-components/text/SmallText";
import { FormLabel } from "../../styles/style-components/form/FormLabel";

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
      <h4>
        <SmallDarkGreenBoldText>결제 정보 입력</SmallDarkGreenBoldText>
      </h4>
      <p>
        <SmallDarkGreyText>결제를 위한 정보를 입력합니다.</SmallDarkGreyText>
      </p>
      <br />
      <div>
        <FormLabel>이름</FormLabel>
        <input
          type="text"
          name="customerName"
          value={customerName}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <FormLabel>이메일</FormLabel>
        <input
          type="text"
          name="customerEmail"
          value={customerEmail}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <FormLabel>전화번호</FormLabel>
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
