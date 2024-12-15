import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./router/userRouter";
import todoTask from "./router/todoRouter";
import adminRouter from "./router/adminRouter";
import connection from "./config/dbConfig";
import bodyParser from "body-parser";

const app = express();

const PORT = process.env.PORT || "8080";

dotenv.config();

connection();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1/user", userRouter);
app.use("/api/todos", todoTask);
app.use("/api/admin", adminRouter);

app.listen(PORT, () => {
  try {
    console.log(`Server is running on PORT ${PORT}`);
  } catch (error: any) {
    console.log("something went wrong" + error.message);
  }
});
