// you bring it from prisma/index.js
// we can create objects from prisma client
const prisma = require("../prisma");
const cookieToken = require("../utils/cookieToken");

// user signup

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // check
    if (!name || !email || !password) {
      throw new Error("please provide the necessary fields");
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    // send user a token
    cookieToken(user, res);
  } catch (error) {
    throw new Error(error);
  }
};
