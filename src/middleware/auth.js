const jwt = require("jsonwebtoken");
const User = require("../models/Users");

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;

    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate", message: e.message });
  }
};
