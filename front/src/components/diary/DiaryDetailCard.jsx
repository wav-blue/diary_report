import { DateTimeKorean } from "../common/DateTimeKorean";
import {
  ModalBackContainer,
  ModalContainer,
  ModalTextBox,
} from "../styled/component/ModalContainer";

function DiaryDetailCard(props) {
  return (
    <ModalBackContainer>
      <ModalContainer>
        <ModalTextBox>
          <DateTimeKorean>{props.modal.date}</DateTimeKorean>
          <p>{props.modal.content}</p>
        </ModalTextBox>

        <button
          onClick={(e) => {
            props.setModal(null);
          }}
        >
          뒤로 가기
        </button>
      </ModalContainer>
    </ModalBackContainer>
  );
}

export default DiaryDetailCard;
