import { useNavigate } from "react-router-dom";

function DiaryCard(props) {
  const navigate = useNavigate();
  return (
    <div>
      <h4>{props.date}</h4>
      <div>
        <p>{props.summary}</p>
      </div>
      <div>
        <label>전체적인 만족도 </label>
        <p>{"★".repeat(props.satisfy)}점</p>
      </div>
    </div>
  );
}

export default DiaryCard;
