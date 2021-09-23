import axios from "axios";
import * as API from "../constants";

export const getProfileData = async (userId) => {
  try {
    const userJWTToken = localStorage.getItem("doubtio-token");
    const profileData = await axios.get(API.GET_USER_PROFILE + userId, {
      headers: {
        Authorization: userJWTToken,
      },
    });
    return profileData.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getProfilePosts = async (userId) => {
  try {
    const userJWTToken = localStorage.getItem("doubtio-token");
    const profilePosts = await axios.get(API.GET_USER_POSTS + userId, {
      headers: {
        Authorization: userJWTToken,
      },
    });

    return profilePosts.data;
  } catch (err) {
    return err.response.data;
  }
};

export const updateProfile = async (data) => {
  try {
    const userJWTToken = localStorage.getItem("doubtio-token");
    const updatedProfileData = await axios.post(API.UPDATE_PROFILE_DATA, data, {
      headers: {
        Authorization: userJWTToken,
        "Content-Type": "multipart/form-data",
      },
    });

    return updatedProfileData.data;
  } catch (err) {
    return err.response.data;
  }
};
