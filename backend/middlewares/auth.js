const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    // cek token dari google atau token buatan sendiri
    const isCustomToken = token.length < 500;

    let decodeData;

    if (token && isCustomToken) {
      // token buatan sendiri
      decodeData = jwt.verify(token, process.env.JWT_SECRET);

      req.userId = decodeData?.data?._id;
    } else {
      // token dari google
      decodeData = jwt.decode(token);

      req.userId = decodeData?.sub;
    }

    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = auth;
