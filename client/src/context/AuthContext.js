import { useContext, useState, createContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { loginUser, registerUser } from "../services/userAccountService";
import { withRouter } from "react-router";
import { verifyUser } from "../services/userAccountService";

const authContext = createContext({
  loadingUser: true,
  isLoggedIn: false,
  userData: {},
  loginUser: () => {},
  logoutUser: () => {},
  registerUser: () => {},
  updateUserData: () => {},
});
let localStorageUserData = JSON.parse(localStorage.getItem("doubtio-userData"));
let userJWTToken = localStorage.getItem("doubtio-token");

const AuthContextProviderOriginal = (props) => {
  const [userData, setUserData] = useState(localStorageUserData || {});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  let history = useHistory();

  useEffect(() => {
    let userData;

    const verifyUserToken = async () => {
      userData = await verifyUser(userJWTToken);
      if (!userData.success) {
        localStorage.removeItem("doubtio-token");
        localStorage.removeItem("doubtio-userData");
        setLoadingUser(false);
        history.push("/login");
      } else {
        setIsLoggedIn(true);
        setLoadingUser(false);
        setUserData(userData.message);
      }
    };

    if (userJWTToken) {
      verifyUserToken();
    } else {
      setLoadingUser(false);
    }

    return () => {
      localStorage.setItem("doubtio-userData", JSON.stringify(userData));
    };
  }, []);

  const loginHandler = async (userLoginData) => {
    try {
      const loginData = await loginUser(userLoginData);
      if (loginData.success) {
        setIsLoggedIn(true);
        setUserData(loginData.message);
        localStorage.setItem(
          "doubtio-userData",
          JSON.stringify(loginData.message)
        );
      }
      return loginData;
    } catch (err) {
      console.log(err);
    }
  };

  const registerHandler = async (userRegistrationData) => {
    try {
      const registrationData = await registerUser(userRegistrationData);
      if (registrationData.success) {
        setIsLoggedIn(true);
        setUserData(registrationData.message);
        localStorage.setItem(
          "doubtio-userData",
          JSON.stringify(registrationData.message)
        );
      }
      return registrationData;
    } catch (err) {
      console.log(err);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("doubtio-token");
    history.push("/login");
  };

  const updateUserDataHandler = (data) => {
    setUserData({
      ...userData,
      ...data,
    });
  };

  const initialValue = {
    isLoggedIn: isLoggedIn,
    loadingUser: loadingUser,
    userData: userData,
    loginUser: loginHandler,
    logoutUser: logoutHandler,
    registerUser: registerHandler,
    updateUserData: updateUserDataHandler,
  };

  return (
    <authContext.Provider value={initialValue}>
      {props.children}
    </authContext.Provider>
  );
};

export const AuthContextProvider = withRouter(AuthContextProviderOriginal);

export default authContext;
