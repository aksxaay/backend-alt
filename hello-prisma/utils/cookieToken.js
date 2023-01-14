// idea -> should be able to generate a cookie token
// set this token in the format of the cookies

const getJwtToken = require("../helpers/getJwtToken");

// we're protecting the cookie? ideal way to setup the cookie
const cookieToken = (user, res) => {
  const token = getJwtToken(user.id);
  const options = {
    // 3 days from now
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),

    // enables server only cookie
    httpOnly: true,
  };

  // salted / hashed password doesn't go to the user.
  user.password = undefined;
  res.status(200).cookie("anyNameToken", token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = cookieToken;
