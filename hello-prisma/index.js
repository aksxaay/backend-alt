const express = require("express");
const app = express();

require("dotenv").config({
  path: `.env`,
  override: true,
});

app.get("/", (req, res) => {
  console.log("req :", req.method, req.httpVersion, req.url);
  res.send("Hello World");
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on Port ${process.env.PORT}`);
});
