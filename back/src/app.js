import express from "express";
import cors from "cors";
import { diaryRouter } from "./router/diaryRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("", diaryRouter);

app.post("/user/score", (req, res) => {
  res.send("요청 성공");
});

app.use(errorMiddleware);

export { app };
