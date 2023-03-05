const express = require("express");
const jwt = require("jsonwebtoken");

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

// jwt (jot)
app.post("/user/generateToken", (req, res) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
    time: Date(),
    userId: 69,
  };

  const token = jwt.sign(data, jwtSecretKey);
  res.send(token);
});

app.get("/user/validateToken", (req, res) => {
  // tokens are generally passed in the header of the request due to security
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const token = req.header(tokenHeaderKey);
    const verified = jwt.verify(token, jwtSecretKey);

    if (verified) {
      res.send("Sucessfully Verified");
    } else {
      return res.status(401).send(error);
    }
  } catch (error) {
    return res.status(401).send(error);
  }
});
