const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { error } = require("console");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Find the user and attach to the request
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (err) {
      console.error("Token verification failed", error);
      res.status(401).json({ message: "Not authorized, Invalid token" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

module.exports = { protect };
