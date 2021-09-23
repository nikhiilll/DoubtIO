import axios from "axios";
import * as API from "../constants";

const searchPosts = async (query) => {
  try {
    const userJWTToken = localStorage.getItem("doubtio-token");
    const returnedPosts = await axios.post(
      API.SEARCH_POSTS,
      { query },
      {
        headers: {
          Authorization: userJWTToken,
        },
      }
    );
    return returnedPosts.data.message;
  } catch (err) {
    return err.response.data;
  }
};

export default searchPosts;
