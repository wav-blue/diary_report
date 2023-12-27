import express from "express";
import cors from "cors";
import { diaryRouter } from "./router/diaryRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { loginRequired } from "./middlewares/loginRequired";
import { userRouter } from "./router/userRouter";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("secret"));

app.use("", userRouter);
app.use("", diaryRouter);

app.get("/test", (req, res) => {
  res.send("요청 성공");
});

app.use(errorMiddleware);

export { app };
