import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  validateUserRegistrationData,
  validateUserLoginData,
} from "../services/userValidationService.js";
import {
  createUser,
  doesUsernameEmailExist,
  getUserData,
} from "../controllers/user.js";
import { checkAuthorization } from "./middlewares.js";

const userRouter = express.Router();

/*
*
User register route
*
*/

userRouter.post("/register", async (req, res) => {
  //Validate the user data in request body
  const { value, error } = validateUserRegistrationData(req.body);
  if (error) {
    return res
      .status(400)
      .send({ success: false, message: error.details[0].message });
  }

  try {
    //Check if user with email or username already exists
    const { userExists } = await doesUsernameEmailExist(req.body);
    if (userExists) {
      return res.status(403).send({
        success: false,
        message: "Username or email-id already exists",
      });
    }

    //Hash the password before storing the user in collection
    const hashedUserPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedUserPassword;

    //Save the user in the Users collection
    const savedUser = await createUser(req.body);

    //Generate the JWT token with the saved user and set the authorization header
    const userJWTToken = await jwt.sign(
      {
        userId: savedUser._id,
        username: savedUser.username,
        emailId: savedUser.emailId,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "4h" }
    );

    res.setHeader("Authorization", "Bearer " + userJWTToken);

    return res.status(201).send({ success: true, message: savedUser });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong, please try again later",
    });
  }
});

/*
*
User login route
*
*/

userRouter.post("/login", async (req, res) => {
  //Check if user has no email-id or username
  if (!req.body.username && !req.body.emailId) {
    return res
      .status(400)
      .send({ success: false, message: "No username or email-id" });
  }

  //Validate user login data
  const { value, error } = validateUserLoginData(req.body);
  if (error) {
    return res
      .status(400)
      .send({ success: false, message: error.details[0].message });
  }

  try {
    //Check if user exists
    const { userExists, userData } = await doesUsernameEmailExist(req.body);
    if (!userExists) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid username or email-id" });
    }

    //Check if password is valid
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    if (!isPasswordValid) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid password" });
    }

    //Generate JWT token for the user and send to the user
    const userJWTToken = await jwt.sign(
      {
        userId: userData._id,
        username: userData.username,
        emailId: userData.emailId,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "4h" }
    );

    res.header("Authorization", "Bearer " + userJWTToken);
    return res.status(200).send({ success: true, message: userData });
  } catch (err) {
    console.log(err);

    return res.status(500).send({
      success: false,
      message: "Something went wrong, please try again later",
    });
  }
});

userRouter.get("/auth", checkAuthorization, async (req, res) => {
  const userData = await getUserData(req.body.username);
  if (!userData) {
    return res
      .status(401)
      .send({ success: false, message: "Invalid username or email-id" });
  }

  return res.status(200).send({ success: true, message: userData });
});

export default userRouter;
