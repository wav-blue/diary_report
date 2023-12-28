import { createDiaryDto } from "../db/DTO/createDiaryDto";
import { diaryService } from "../services/diaryService";

exports.readDiary = async function (req, res) {
  try {
    const { userId } = req.params;
    const diary = await diaryService.getDiary({ user_id: userId });
    res.json(diary);
  } catch (error) {
    next(error);
  }
};

exports.writeDiary = async function (req, res, next) {
  try {
    const { userId } = req.params;
    const { meal, sleep, activity, satisfaction, comment } = req.body;

    if (!userId || !meal || !sleep || !activity || !satisfaction) {
      throw new Error("잘못된 요청 정보 입니다!");
    }
    const newDiary = new createDiaryDto(
      { user_id: userId, meal, sleep, activity, satisfaction, comment },
      new Date()
    );
    diaryService.createDiary({ newDiary });
    res.status(201).json();
  } catch (error) {
    next(error);
  }
};
