// you bring it from prisma/index.js
// we can create objects from prisma client
const prisma = require("../prisma");
const cookieToken = require("../utils/cookieToken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// user signup

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = await req.body;

    console.dir(req.body, { depth: null });
    // check
    if (!name || !email || !password) {
      throw new Error("Please provide the necessary fields");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      // send user a token
      cookieToken(user, res);
    }
  } catch (error) {
    res.status(422).json({
      message: error.message,
    });

    console.error(error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { name, password } = await req.body;

    const user = await prisma.user.findFirst({
      where: {
        name,
      },
    });

    console.log("user", user);

    if (user) {
      const match = await bcrypt.compare(password, user.password);

      const accessToken = jwt.sign(
        JSON.stringify(user),
        process.env.JWT_SECRET
      );

      if (match) {
        res.json({ accessToken });
      } else {
        res.json({ message: "Invalid Credentials" });
      }
    }
  } catch (error) {
    res.json({
      message: error.message,
    });

    console.error(error);
  }
};
