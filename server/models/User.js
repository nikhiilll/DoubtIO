import mongoose from "mongoose";
const { Schema } = mongoose;
/*
USER SCHEMA
============
-userid -> documentId/ObjectID from MongoDB
-username -> String
-emailId -> String
-password -> String of hashed password
-First Name -> String
-Last Name -> String
-profilePicURL -> String of s3 bucket URL
-description -> description
-posts -> Array of Post object IDs
-followingTopics -> String of topics the user is following
-lastLoginDate -> Last date the user logged in 
*/

const userSchema = new Schema({
  username: String,
  emailId: String,
  password: String,
  firstName: String,
  lastName: String,
  profilePicURL: {
    type: String,
    default: null,
  },
  posts: [String],
  description: String,
  followingTopics: [String],
  lastLoginDate: {
    type: Date,
    default: Date.now,
  },
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
