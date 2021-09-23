import axios from "axios";
import * as API from "../constants";

// Send the post data
export const createPost = async (postData) => {
  try {
    const userJWTToken = localStorage.getItem("doubtio-token");
    const returnedPostData = await axios.post(API.CREATE_POST, postData, {
      headers: {
        Authorization: userJWTToken,
        "Content-Type": "multipart/form-data",
      },
    });
    return returnedPostData.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getPosts = async () => {
  try {
    const userJWTToken = localStorage.getItem("doubtio-token");
    const returnedPosts = await axios.get(API.GET_POSTS, {
      headers: {
        Authorization: userJWTToken,
      },
    });
    return returnedPosts.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getOnePost = async (postId) => {
  try {
    const userJWTToken = localStorage.getItem("doubtio-token");
    const returnedPost = await axios.get(API.GET_POSTS + `/${postId}`, {
      headers: {
        Authorization: userJWTToken,
      },
    });
    return returnedPost.data;
  } catch (err) {
    return err.response.data;
  }
};

export const upvotePost = async (likeData) => {
  try {
    const userJWTToken = localStorage.getItem("doubtio-token");
    const returnedPost = await axios.patch(API.UPVOTE_POST, likeData, {
      headers: {
        Authorization: userJWTToken,
      },
    });
    return returnedPost.data;
  } catch (err) {
    return err.response.data;
  }
};

export const downvotePost = async (likeData) => {
  try {
    const userJWTToken = localStorage.getItem("doubtio-token");
    const returnedPost = await axios.patch(API.DOWNVOTE_POST, likeData, {
      headers: {
        Authorization: userJWTToken,
      },
    });
    return returnedPost.data;
  } catch (err) {
    return err.response.data;
  }
};

export const addComment = async (commentData) => {
  try {
    const userJWTToken = localStorage.getItem("doubtio-token");
    const returnedPost = await axios.put(API.COMMENT_POST, commentData, {
      headers: {
        Authorization: userJWTToken,
      },
    });
    return returnedPost.data;
  } catch (err) {
    return err.response.data;
  }
};

export const deletePost = async (postId) => {
  try {
    const userJWTToken = localStorage.getItem("doubtio-token");
    const returnedPost = await axios.delete(API.DELETE_POST + postId, {
      headers: {
        Authorization: userJWTToken,
      },
    });
    return returnedPost.data;
  } catch (err) {
    return err.response.data;
  }
};
