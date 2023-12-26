import { Router } from "express";
import dairyController from "../controller/diaryController";
const diaryRouter = Router();

diaryRouter.get("/:userId/diary", dairyController.readDiary);

// 추가
diaryRouter.post("/:userId/diary", dairyController.writeDiary);

// 삭제
diaryRouter.delete("/:userId/diary", dairyController.writeDiary);

// 수정
diaryRouter.put("/:userId/diary", dairyController.writeDiary);

export { diaryRouter };
