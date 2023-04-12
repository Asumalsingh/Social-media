import jwt from "jsonwebtoken";

const validateUser = (req, res, next) => {
  // Validate user

  // if token is not exist
  const token = req.header("auth-token");

  if (!token) {
    return res
      .status(401)
      .send({ message: "Please authenticate using valid token" });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ message: "Please authenticate using a valid token" });
  }
};

export default validateUser;
