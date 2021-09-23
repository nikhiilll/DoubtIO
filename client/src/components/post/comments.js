import { useContext, useState } from "react";
import { addComment } from "../../services/userPostService";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { formatDistanceToNowStrict } from "date-fns";

const Comments = (props) => {
  const authContext = useContext(AuthContext);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(props.comments);

  const postCommentHandler = async (e) => {
    e.preventDefault();

    const commentData = {
      postId: props.postId,
      comment: {
        text: commentText,
        userId: authContext.userData._id,
        username: authContext.userData.username,
      },
    };

    const returnedPost = await addComment(commentData);
    setCommentText("");
    setComments(returnedPost.message.comments);
  };

  return (
    <div className="mt-4">
      {/* Form to post a comment */}
      <form onSubmit={postCommentHandler} className="flex space-x-2">
        <input
          type="text"
          placeholder="Post a comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className=" w-5/6 outline-none p-2 rounded-md border border-gray-400 focus:border-primary"
        ></input>
        <button
          type="submit"
          className="w-1/6 p-2 rounded-md border transition-colors duration-300 ease-in-out text-primary border-primary hover:bg-primary hover:text-white"
        >
          Post
        </button>
      </form>

      {/* Comments */}
      <div className="p-2 mt-4 w-full flex flex-col space-y-1">
        {comments.map((comment) => {
          return (
            <div className="flex space-x-2 items-end" key={comment._id}>
              <Link
                to={`/user/` + comment.userId}
                className="font-semibold text-gray-800"
              >
                {comment.username}
              </Link>
              <p>{comment.text}</p>
              <p className="text-gray-300 text-sm">
                {formatDistanceToNowStrict(new Date(comment.date)) + " ago"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
