import { useSearchParams } from "react-router-dom";
import * as Api from "../../Api";
import { GreenButton } from "../../styles/style-components/button/ColorButton";

export function FailPage() {
  const [searchParams] = useSearchParams();

  const failPayments = async () => {
    try {
      const req = {
        paymentErrCode: searchParams.get("code"),
        paymentErrMessage: searchParams.get("message"),
      };
      const res = await Api.post(`payments/report`, req);
      alert("신고가 접수되었습니다");
      navigate("/diary");
    } catch (err) {}
  };

  return (
    <div className="result wrapper">
      <div className="box_section">
        <h2 style={{ padding: "20px 0px 10px 0px" }}>
          <img
            width="30px"
            src="https://static.toss.im/3d-emojis/u1F6A8-apng.png"
          />
          결제 실패
        </h2>
        <p>{`code = ${searchParams.get("code")}`}</p>
        <p>{`message = ${searchParams.get("message")}`}</p>

        <div className="result wrapper">
          <GreenButton
            onClick={() => {
              failPayments();
            }}
            className="button"
          >
            문의 남기기
          </GreenButton>
        </div>
      </div>
    </div>
  );
}
