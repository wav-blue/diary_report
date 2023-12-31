import { createDiaryDto } from "../db/DTO/createDiaryDto";
import { diaryService } from "../services/diaryService";
import { parseDatewithTime } from "../utils/dateFunction";

exports.readDiaryToday = async function (req, res, next) {
  try {
    const { userId } = req.params;
    if (!userId) {
      console.log(">>>>>>");
      res.json([]);
      return;
    }
    const results = await diaryService.getDiaryToday({ user_id: userId });
    if (results.length > 0) {
      for (let i = 0; i < results.length; i++) {
        results[i].date = parseDatewithTime(results[i].createdAt);
      }
    }

    res.json(results);
  } catch (error) {
    next(error);
  }
};

exports.readDiary = async function (req, res, next) {
  try {
    const { userId } = req.params;
    const results = await diaryService.getDiary({ user_id: userId });
    if (results.length > 0) {
      for (let i = 0; i < results.length; i++) {
        results[i].date = parseDatewithTime(results[i].createdAt);
      }
    }

    res.json(results);
  } catch (error) {
    next(error);
  }
};

exports.writeDiary = async function (req, res, next) {
  try {
    const { userId } = req.params;
    const { meal, sleep, activity, satisfaction, comment } = req.body;
    console.log({ userId });
    console.log({ meal, sleep, activity, satisfaction, comment });
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
