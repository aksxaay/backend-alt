// mdn docs using mongoose

const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: `.env.local`, override: true });

const mongoDB = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@clustername.ozi1ee3.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));
