import { useState } from "react";
import { createPortal } from "react-dom";
import { createPost } from "../../services/userPostService";

const Modal = ({ isOpen, toggleModal }) => {
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    image: "",
    tags: [],
  });
  const [isUploading, setIsUploading] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const closeModal = () => {
    setPostData({
      title: "",
      description: "",
      image: "",
      tags: [],
    });
    setIsUploading(false);
    toggleModal(false);
  };

  const createTags = (e) => {
    if (e.keyCode !== 32) return;

    setPostData({
      ...postData,
      tags: [...new Set([tagInput.trim(), ...postData.tags])],
    });
    setTagInput("");
  };

  const removeTag = (tag) => {
    setPostData({
      ...postData,
      tags: postData.tags.filter((currentTag) => currentTag !== tag),
    });
  };
  const submitFormHandler = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      //Create new form data for axios to send
      let formData = new FormData();
      formData.append("image", postData.image);
      formData.append("title", postData.title);
      formData.append("description", postData.description);
      formData.append("tags", JSON.stringify(postData.tags));
      const data = await createPost(formData);
      setPostData({
        title: "",
        description: "",
        image: "",
        tags: [],
      });
    } catch (err) {
      console.log(err);
    }
    setIsUploading(false);
    toggleModal(false);
  };

  const imageSelectedHandler = (e) => {
    setPostData({ ...postData, image: e.target.files[0] });
  };

  if (isOpen)
    return createPortal(
      <>
        <div className="fixed inset-0 bg-black opacity-60 z-100"></div>
        <div className="fixed inset-0 mt-20 z-100 flex justify-center items-start py-10">
          <div className="flex flex-col bg-white  w:full sm:w-2/5 rounded-xl text-gray-800">
            {/* Header */}
            <div className="flex justify-between p-4 text-xl">
              <span className="mx-2 p-1">Ask a doubt</span>
              <button
                onClick={closeModal}
                type="button"
                className="hover:bg-gray-300 rounded-full text-gray-700 p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <hr></hr>

            {/* Doubt title, description and image */}
            <form
              className="flex flex-col justify-center space-y-2 p-4 h-full w-full"
              onSubmit={submitFormHandler}
            >
              <input
                type="text"
                placeholder="Title"
                minLength="5"
                maxLength="100"
                className="p-2 border focus:border-primary rounded-lg outline-none"
                onChange={(e) => {
                  setPostData({
                    ...postData,
                    title: e.target.value,
                  });
                }}
                value={postData.title}
              ></input>

              <textarea
                placeholder="Description"
                className="p-2 border focus:border-primary rounded-lg outline-none h-32 w-full resize-none"
                onChange={(e) => {
                  setPostData({
                    ...postData,
                    description: e.target.value,
                  });
                }}
                value={postData.description}
              ></textarea>

              <label className="p-2 border cursor-pointer hover:bg-gray-100 hover:border-primary rounded-lg outline-none text-gray-400">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={imageSelectedHandler}
                ></input>
              </label>
              {postData.image && (
                <span className="text-gray-500">{postData.image.name}</span>
              )}

              <input
                type="text"
                placeholder="Create Tags"
                maxLength="24"
                className="p-2 border focus:border-primary rounded-lg outline-none"
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={createTags}
                value={tagInput}
              ></input>
              <div className="flex flex-wrap w-full">
                {postData.tags.map((tag) => {
                  return (
                    <p className="bg-gray-100 text-primary rounded-md p-1 m-2 flex items-center justify-center">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="border hover:border-gray-500 rounded-full ml-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-400 hover:text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </p>
                  );
                })}
              </div>

              {isUploading ? (
                <div className="flex items-center justify-center space-x-2 animate-bounce">
                  <div className="w-4 h-4 bg-primary rounded-full"></div>
                  <div className="w-4 h-4 bg-primary rounded-full"></div>
                  <div className="w-4 h-4 bg-primary rounded-full"></div>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={
                    !(postData.title && postData.description) || isUploading
                  }
                  className="text-gray-800 disabled:opacity-40 border border-primary transition duration-200 ease-in-out hover:text-white hover:bg-primary p-2 rounded-lg"
                >
                  Post
                </button>
              )}
            </form>
          </div>
        </div>
      </>,
      document.getElementById("modal")
    );
  return null;
};

export default Modal;
