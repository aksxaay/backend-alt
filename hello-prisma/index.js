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
app.use(express.static); // serves static assets such as HTML files, images, and so on.

// cookie middleware
app.use(cookieParser());

app.get("/", (req, res) => {
  console.log("req :", req.method, req.httpVersion, req.url);
  res.send("Hello World");
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on Port ${process.env.PORT}`);
});
