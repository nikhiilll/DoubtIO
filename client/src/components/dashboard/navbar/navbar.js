import { useContext } from "react";
import { Link } from "react-router-dom";
import authContext from "../../../context/AuthContext";
import SearchBar from "./searchBar";

const Navbar = () => {
  const authCtx = useContext(authContext);

  return (
    <div className="fixed inset-0 bg-white border-b border-gray-100 w-full h-12 z-50">
      <div className="flex justify-between w-full sm:w-3/4 sm:mx-auto h-12">
        {/* Left container div for logo and search box */}
        <div className="p-2 flex object-contain space-x-4 w-4/5">
          <Link to="/dashboard">
            <img src="/logoSearchBar.png" className="h-8 w-8"></img>
          </Link>
          <SearchBar />
        </div>

        {/* Right container for the profile */}
        <div className="flex items-center justify-center p-2">
          <img
            src={authCtx.userData.profilePicURL || "/noavatar.png"}
            className="h-8 w-8 rounded-full"
          ></img>
          <Link
            to={`/profile/` + authCtx.userData.username}
            className="hover:text-primary font-medium text-sm text-gray-800 ml-2"
          >
            {authCtx.userData.firstName + " " + authCtx.userData.lastName}
          </Link>
          <button
            type="button"
            className="ml-4 px-2 py-1 rounded-md hover:bg-primary hover:text-white text-primary bg-gray-100"
            onClick={authCtx.logoutUser}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
