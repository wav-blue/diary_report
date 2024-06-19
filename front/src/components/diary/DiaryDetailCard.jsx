import { DateTimeKorean } from "../common/DateTimeKorean";
import {
  StyleModalBackContainer,
  StyleModalButton,
  StyleModalContainer,
  StyleModalTextBox,
} from "../../styles/style-components/component/StyleModalContainer";
import { ModalContainer } from "../common/ModalContainer";

function DiaryDetailCard(props) {
  return (
    <ModalContainer
      title={<DateTimeKorean>{props.modal.date}</DateTimeKorean>}
      detail={props.modal.content}
      setModal={props.setModal}
    />
  );
}

export default DiaryDetailCard;
