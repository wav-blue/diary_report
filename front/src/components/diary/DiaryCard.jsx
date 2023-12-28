import { useNavigate } from "react-router-dom";

function DiaryCard(props) {
  const navigate = useNavigate();
  return (
    <div>
      <h2>{props.date}</h2>
      <div>
        <label>식사 </label>
        {props.meal} <a>점</a>
      </div>
      <div>
        <label>수면 </label>
        {props.sleep}
        <a>점</a>
      </div>
      <div>
        <label>활동량 </label>
        {props.activity}
        <a>점</a>
      </div>
      <div>
        <label>전체적인 만족도 </label>
        {props.satisfaction}
        <a>점!</a>
      </div>
      <div>
        <label>나의 한마디</label>
        <p>{props.comment}</p>
      </div>
      <button onClick={() => navigate("/")}>메인으로 돌아가기</button>
    </div>
  );
}

export default DiaryCard;
