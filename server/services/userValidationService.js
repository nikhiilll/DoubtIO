import Joi from "joi";

const userRegistrationSchema = Joi.object({
  username: Joi.string().min(3).max(16).required().alphanum(),
  emailId: Joi.string().email().required(),
  password: Joi.string().min(3).max(16).required(),
  firstName: Joi.string().min(3).max(24).required(),
  lastName: Joi.string().min(3).max(24).allow(""),
  followingTopics: Joi.array(),
  profilePicURL: Joi.string(),
});

const validateUserRegistrationData = (userData) => {
  return userRegistrationSchema.validate(userData);
};

const userLoginSchema = Joi.object({
  password: Joi.string().min(3).max(16).required(),
  username: Joi.string().min(3).max(16).alphanum(),
  emailId: Joi.string().email(),
});

const validateUserLoginData = (userData) => {
  return userLoginSchema.validate(userData);
};

const profileDataSchema = Joi.object({
  userId: Joi.string(),
  username: Joi.string(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  description: Joi.string(),
  profilePicURL: Joi.string(),
  profileImage: Joi.any(),
});

const validateProfileData = (profileData) => {
  return profileDataSchema.validate(profileData);
};

export {
  validateUserRegistrationData,
  validateUserLoginData,
  validateProfileData,
};
