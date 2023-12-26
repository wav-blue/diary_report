import { Diary } from "../db/DAO/Diary";

class diaryService {
  // 전체 조회
  static async getDiary({ user_id }) {
    const result = await Diary.getDiary({ user_id });
    return result;
  }
  // 추가
  static async createDiary({ newDiary }) {
    const result = Diary.createDiary({ newDiary });
    return result;
  }
  // 수정
  //   static async updateDiary(newData) {
  //     return "";
  //   }
  // 삭제
  //   static async deleteDiary() {
  //     const result = Diary.deleteDiary();
  //     return result;
  //   }
}
export { diaryService };
