import jwt from "jsonwebtoken";

const checkAuthorization = async (req, res, next) => {
  try {
    const userToken = req.get("Authorization").split(" ")[1];
    if (!userToken)
      return res.status(400).send({
        success: false,
        message: "Invalid user, please login again",
      });

    const decoded = await jwt.verify(userToken, process.env.JWT_SECRET_KEY);
    req.body.userId = decoded.userId;
    req.body.username = decoded.username;
    next();
  } catch (err) {
    return res
      .status(403)
      .send({ success: false, message: "Invalid user, please login again" });
  }
};

export { checkAuthorization };
