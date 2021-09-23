import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  getProfileData,
  getProfilePosts,
} from "../../services/userProfileService";
import TimelinePost from "../dashboard/timelinePost";
import Navbar from "../dashboard/navbar/navbar";
import EditProfileModal from "./editProfile";
import authContext from "../../context/AuthContext";

const Profile = () => {
  const { username } = useParams();
  const [profileData, setProfileData] = useState({});
  const [profilePosts, setProfilePosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const authCtx = useContext(authContext);

  useEffect(() => {
    const getProfileDetails = async () => {
      const returnedProfileData = await getProfileData(username);
      return returnedProfileData;
    };

    const getProfilePost = async () => {
      const returnedProfilePosts = await getProfilePosts(username);
      return returnedProfilePosts;
    };

    let profileData;
    const getData = async () => {
      profileData = await Promise.all([getProfileDetails(), getProfilePost()]);
      setProfileData(profileData[0].message);
      setProfilePosts(profileData[1].message);
      setIsLoading(false);
    };
    getData();
  }, []);

  return isLoading ? (
    <div className="flex items-center justify-center space-x-2 mt-32 animate-bounce">
      <div className="w-6 h-6 bg-primary rounded-full"></div>
      <div className="w-6 h-6 bg-primary rounded-full"></div>
      <div className="w-6 h-6 bg-primary rounded-full"></div>
    </div>
  ) : (
    <div className="container w-screen h-screen flex justify-center p-3 mx-auto">
      <Navbar />
      <div className="w-full sm:w-3/5 mt-16 mx-auto">
        {/* Profile Details */}
        <div className="flex justify-center p-4 border bg-white shadow-sm border-gray-100 rounded-md">
          <img
            src={profileData.profilePicURL || "/noavatar.png"}
            className="h-40 w-40 rounded-full"
          ></img>

          <div className="flex flex-col justify-center w-3/4 ml-8">
            <p className="font-normal text-xl sm:text-3xl">
              {profileData.username}
            </p>
            <p>
              <span className="font-semibold mt-1">{profilePosts.length}</span>{" "}
              doubts asked
            </p>
            <p className="font-medium mt-4">
              {profileData.firstName + " " + profileData.lastName}
            </p>
            <p>{profileData.description}</p>

            {authCtx.userData.username === username && (
              <button
                type="button"
                className="border border-gray-300 text-sm text-gray-600 hover:text-primary hover:border-primary rounded-md p-1 mt-2 w-24"
                onClick={() => setIsEditOpen(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Posts */}
        <div className="flex flex-col justify-center space-y-2 p-4 w-full mt-10">
          {profilePosts.map((post) => (
            <TimelinePost ley={post._id} {...post} />
          ))}
        </div>
      </div>
      <EditProfileModal
        isOpen={isEditOpen}
        toggleModal={setIsEditOpen}
        profileData={profileData}
        updateProfileData={setProfileData}
      />
    </div>
  );
};

export default Profile;
