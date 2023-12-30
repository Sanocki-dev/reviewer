import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  try {
    // Grabs the auth header
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    // Removes bearer from token
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    res.user = verified;

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default verifyToken;