import User from "../models/User.js";

//Register the user i.e. add the user in the users collection
const createUser = async (data) => {
  const user = new User({
    username: data.username,
    emailId: data.emailId,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName ?? "",
    profilePicURL: data.profilePicURL,
    followingTopics: data.followingTopics,
    lastLoginDate: Date.now(),
  });

  let savedUser;

  try {
    savedUser = await user.save();
  } catch (err) {
    console.log(err);
  }

  return savedUser;
};

//Find if the user already exists for a particular username or email id
const doesUsernameEmailExist = async (data) => {
  try {
    const userData = await User.findOne({
      $or: [{ username: data.username }, { emailId: data.emailId }],
    });
    if (userData) return { userExists: true, userData: userData };
  } catch (err) {
    return { userExists: false, userData: null };
  }

  return { userExists: false, userData: null };
};

const getUserData = async (data) => {
  let userData;

  try {
    userData = await User.findOne({ username: data });
  } catch (err) {
    console.log(error);
  }
  return userData;
};

const updateProfile = async (data) => {
  let userData;

  try {
    userData = await User.findByIdAndUpdate(
      data.userId,
      {
        firstName: data.firstName,
        lastName: data.lastName,
        description: data.description,
        profilePicURL: data.profilePicURL,
      },
      { new: true }
    );
  } catch (err) {
    console.log(err);
  }

  return userData;
};

export { createUser, doesUsernameEmailExist, getUserData, updateProfile };
