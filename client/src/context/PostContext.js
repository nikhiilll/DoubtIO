import { createContext, useContext, useEffect, useState } from "react";
import { getPosts } from "../services/userPostService";

const postsContext = createContext({
  posts: [],
  setPosts: () => {},
});

export const PostsContextProvider = (props) => {
  const [posts, setPosts] = useState([]);
  // const PostsContext = useContext(postsContext);

  const initialValue = {
    posts: posts,
    setPosts: setPosts,
  };

  useEffect(() => {
    const getTimelinePosts = async () => {
      let returnedPosts = await getPosts();
      setPosts(returnedPosts.message);
    };

    getTimelinePosts();
  }, []);

  return (
    <postsContext.Provider value={initialValue}>
      {props.children}
    </postsContext.Provider>
  );
};

export default postsContext;
