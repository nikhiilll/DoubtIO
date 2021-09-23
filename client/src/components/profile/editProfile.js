import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { updateProfile } from "../../services/userProfileService";
import authContext from "../../context/AuthContext";

const EditProfileModal = ({
  isOpen,
  toggleModal,
  profileData,
  updateProfileData,
}) => {
  const [editData, setEditData] = useState({
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    description: profileData.description,
    profilePicURL: profileData.profilePicURL,
    profileImage: "",
  });

  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const authCtx = useContext(authContext);

  const closeModal = () => {
    setEditData({
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      description: profileData.description,
      profilePicURL: profileData.profilePicURL,
      profileImage: "",
    });
    setError("");
    setIsUploading(false);
    toggleModal(false);
  };

  const imageSelectedHandler = (e) => {
    setEditData({ ...editData, profileImage: e.target.files[0] });
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      //Create new form data for axios to send
      let formData = new FormData();
      if (editData.profileImage)
        formData.append("profileImage", editData.profileImage);
      else formData.append("profilePicURL", editData.profilePicURL);
      formData.append("firstName", editData.firstName);
      formData.append("lastName", editData.lastName);
      formData.append("description", editData.description);
      const data = await updateProfile(formData);
      if (data.success) {
        authCtx.updateUserData(data.message);
        updateProfileData({
          ...profileData,
          firstName: data.message.firstName,
          lastName: data.message.lastName,
          profilePicURL: data.message.profilePicURL,
          description: data.message.description,
        });
        setIsUploading(false);
        toggleModal(false);
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isOpen)
    return createPortal(
      <>
        <div className="fixed inset-0 bg-black opacity-60 z-100"></div>
        <div className="fixed inset-0 mt-20 z-100 flex justify-center items-start py-10">
          <div className="flex flex-col bg-white  w:full sm:w-2/5 rounded-xl text-gray-800">
            {/* Header */}
            <div className="flex justify-between p-4 text-xl">
              <span className="mx-2 p-1">Edit Profile</span>
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
                placeholder="First name"
                minLength="5"
                maxLength="100"
                className="p-2 border focus:border-primary rounded-lg outline-none"
                onChange={(e) => {
                  setEditData({
                    ...editData,
                    firstName: e.target.value,
                  });
                }}
                value={editData.firstName}
              ></input>

              <input
                type="text"
                placeholder="Last name"
                minLength="5"
                maxLength="100"
                className="p-2 border focus:border-primary rounded-lg outline-none"
                onChange={(e) => {
                  setEditData({
                    ...editData,
                    lastName: e.target.value,
                  });
                }}
                value={editData.lastName}
              ></input>

              <textarea
                placeholder="Description"
                maxLength="200"
                className="p-2 border focus:border-primary rounded-lg outline-none h-32 w-full resize-none"
                onChange={(e) => {
                  setEditData({
                    ...editData,
                    description: e.target.value,
                  });
                }}
                value={editData.description}
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
              {editData.profileImage && (
                <span className="text-gray-500">
                  {editData.profileImage.name}
                </span>
              )}

              <button
                type="submit"
                disabled={!editData.firstName}
                className="text-gray-800 disabled:opacity-40 border border-primary transition duration-200 ease-in-out hover:text-white hover:bg-primary p-2 rounded-lg"
              >
                Done
              </button>

              {error && (
                <span className="text-md text-center text-red-500">
                  {error}
                </span>
              )}
            </form>
          </div>
        </div>
      </>,
      document.getElementById("modal")
    );
  return null;
};

export default EditProfileModal;
