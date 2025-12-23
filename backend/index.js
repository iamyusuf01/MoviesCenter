import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import userRouter from './routes/userRouter.js'
import movieRouter from './routes/movieRouter.js'
import adminRouter from './routes/adminRouter.js'


const app = express();
const PORT = process.env.PORT || 3000;
//MongoDB Connect
connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/movies", movieRouter);


app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});