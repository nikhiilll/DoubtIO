import axios from "axios";
import * as API from "../constants";

export const loginUser = async (userData) => {
  try {
    const returnedUserData = await axios.post(API.USER_LOGIN, userData);
    localStorage.setItem(
      "doubtio-token",
      returnedUserData.headers["authorization"]
    );
    return returnedUserData.data;
  } catch (err) {
    return err.response.data;
  }
};

export const registerUser = async (userData) => {
  try {
    const returnedUserData = await axios.post(API.USER_REGISTER, userData);
    localStorage.setItem(
      "doubtio-token",
      returnedUserData.headers["authorization"]
    );
    return returnedUserData.data;
  } catch (err) {
    return err.response.data;
  }
};

export const verifyUser = async (userJWTToken) => {
  try {
    const userData = await axios.get(API.VERIFY_USER, {
      headers: {
        Authorization: userJWTToken,
      },
    });

    return userData.data;
  } catch (err) {
    return err.response.data;
  }
};
