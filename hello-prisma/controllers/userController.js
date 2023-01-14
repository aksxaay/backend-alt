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
