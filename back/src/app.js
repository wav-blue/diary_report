import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/user/score", (req, res) => {
  res.send("요청 성공");
});

export { app };
