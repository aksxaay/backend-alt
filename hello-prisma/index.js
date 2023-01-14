const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

require("dotenv").config({
  path: `.env`,
  override: true,
});

// regular middleware
app.use(express.json()); // parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })); // parses incoming requests with URL-encoded payloads

// cookie middleware
app.use(cookieParser());

// Routes
const userRouter = require("./routes/userRoute");

app.use("/api", userRouter);

app.get("/hello-world", (req, res) => {
  console.log("req :", req.method, req.httpVersion, req.url);
  res.send("Hello World");
});

app.get("/api", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening on Port ${process.env.PORT}`);
});
