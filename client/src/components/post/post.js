import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatDistanceToNowStrict } from "date-fns";
import {
  getOnePost,
  upvotePost,
  downvotePost,
} from "../../services/userPostService";
import AuthContext from "../../context/AuthContext";
import { debounce, update } from "lodash";
import Comments from "./comments";
import Navbar from "../dashboard/navbar/navbar";
import { deletePost } from "../../services/userPostService";
import { useHistory } from "react-router-dom";

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [error, setError] = useState("");
  const authContext = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    const getPost = async () => {
      const returnedPost = await getOnePost(postId);
      setPost(returnedPost.message);
      setLoading(false);
      for (let user of returnedPost.message.votedBy) {
        if (user === authContext.userData._id) {
          setIsUpvoted(true);
        }
      }
    };

    getPost();
  }, []);

  const updateVotes = async () => {
    const likeData = {
      postId: post._id,
      userId: authContext.userData._id,
    };
    let returnedPost;
    if (isUpvoted) {
      returnedPost = await downvotePost(likeData);
    } else {
      returnedPost = await upvotePost(likeData);
    }
    if (returnedPost) setPost(returnedPost.message);
  };

  const debouncedUpdateVotes = debounce(updateVotes, 500);

  const voteClickHandler = () => {
    setIsUpvoted((prev) => !prev);
    debouncedUpdateVotes();
  };

  const deletePostHandler = async () => {
    const data = await deletePost(post._id);
    if (data.success) {
      history.push("/dashboard");
    } else {
      setError(data.message);
    }
  };

  return loading ? (
    <div className="flex items-center justify-center space-x-2 mt-32 animate-bounce">
      <div className="w-6 h-6 bg-primary rounded-full"></div>
      <div className="w-6 h-6 bg-primary rounded-full"></div>
      <div className="w-6 h-6 bg-primary rounded-full"></div>
    </div>
  ) : (
    <div>
      <Navbar />
      <div className="container flex items-center justify-center">
        <div className="relative flex flex-col p-4 mt-20 mb-5 mx-auto border border-gray-100 shadow-md w-full md:w-3/5 bg-white">
          {error && (
            <span className="text-red-500 text-center text-md">{error}</span>
          )}
          {post.username === authContext.userData.username && (
            <div
              className="absolute right-4 top-4 text-gray-500 hover:text-red-700 cursor-pointer"
              onClick={deletePostHandler}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
          )}
          <p className="font-medium text-xl mb-2">{post.title}</p>
          <p className="font-light text-gray-600 text-sm">
            Posted by{" "}
            <Link
              to={`/profile/` + post.username}
              className="hover:text-primary font-medium"
            >
              {post.username}
            </Link>
          </p>
          <p className="font-light text-gray-600 text-sm">
            {formatDistanceToNowStrict(new Date(post.createdDate))} ago
          </p>
          <p className="my-4 text-gray-800">{post.description}</p>
          {post.postPicURL ? (
            <img src={post.postPicURL} className="max-w-xl max-h-xl"></img>
          ) : null}
          <div className="flex flex-wrap w-full">
            {post.tags.map((tag) => {
              return (
                <p
                  key={tag}
                  className="bg-gray-100 text-primary rounded-md p-1 mr-2 sm:mt-2  text-sm flex items-center justify-center"
                >
                  {tag}
                </p>
              );
            })}
          </div>
          {authContext.userData._id && (
            <div
              className={
                "flex items-center mt-4 space-x-2 group cursor-pointer " +
                (isUpvoted && "text-red-500")
              }
              onClick={voteClickHandler}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 group-hover:text-primary"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="group-hover:text-primary">{post.votes} Votes</p>
            </div>
          )}
          <Comments postId={postId} comments={post.comments} />
        </div>
      </div>
    </div>
  );
};

export default Post;
