import { useContext } from "react";
import useGetPosts from "../../hooks/useGetPosts";
import TimelinePost from "./timelinePost";
import postsContext from "../../context/PostContext";

const Timeline = () => {
  const postsCtx = useContext(postsContext);
  return postsCtx.posts ? (
    <div className="col-span-2 flex flex-col space-y-4 pb-10 w-full">
      {postsCtx.posts.map((post) => (
        <TimelinePost key={post._id} {...post} />
      ))}
    </div>
  ) : (
    <div>No posts found</div>
  );
};

export default Timeline;
