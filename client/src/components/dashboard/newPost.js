import { useContext, useState } from "react";
import Modal from "./modal";
import authContext from "../../context/AuthContext";

const NewPost = () => {
  const authCtx = useContext(authContext);
  const [createPost, setCreatePost] = useState(false);
  const newPostHandler = () => {
    setCreatePost(true);
  };
  return (
    <div className="col-span-2 flex justify-evenly items-center bg-white rounded-lg border border-gray-200 h-16 w-full shadow-sm">
      <img
        src={authCtx.userData.profilePicURL || "/noavatar.png"}
        className="h-12 w-12 rounded-full border border-gray-100"
      ></img>
      <div
        className="border border-gray-200 p-3 text-gray-500 hover:bg-gray-200 cursor-pointer rounded-3xl w-4/5"
        onClick={newPostHandler}
      >
        Ask a doubt
      </div>
      <Modal isOpen={createPost} toggleModal={setCreatePost} />
    </div>
  );
};

export default NewPost;
