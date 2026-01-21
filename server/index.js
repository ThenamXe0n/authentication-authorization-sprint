require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const MainRouter = require("./routes/main.router");
const { default: connectDB } = require("./config/db.config");
const { isloggedIn, refresh } = require("./middlewares/auth.middleware");

const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
//middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(cors(corsOptions));

//routes handelers
app.get("/", (req, res) => {
  res.send("hi working/..");
});
app.use("/api", MainRouter);
app.get("/protected", isloggedIn, (req, res) => {
  res.status(200).json({ message: "user is logged in" });
});

let PORT = process.env.PORT || "8080";

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`server is listining on port : ${PORT}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
});
