import { useState, useEffect } from "react";
import { getPosts } from "../services/userPostService";

const useGetPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getTimelinePosts = async () => {
      let returnedPosts = await getPosts();
      setPosts(returnedPosts.message);
    };

    getTimelinePosts();
  }, []);

  return posts;
};

export default useGetPosts;
