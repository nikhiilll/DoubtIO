import mongoose from "mongoose";
const { Schema } = mongoose;
/*
POST SCHEMA
============
-postId -> document id/_id object id create by MongoDB
-userId -> user id of the uer who created the post
-title -> title for the post/question
-description -> description/info for the post
-postPicURL -> AWS S3 bucket URL for the pic uploaded to the post
-tags -> Tags added for the post
-votes -> upvotes/downvotes for the post
-comments -> Array of comments/replies for the post, would be an object
    -commentText -> the reply posted
    -commentDate -> date of the comment
    -username -> name of person who posted the comment 
    -userId -> userId of the person who posted the comment
-createdDate -> Date on which the post was created, default date
*/
const postSchema = new Schema({
  userId: String,
  username: String,
  title: String,
  description: String,
  postPicURL: {
    type: String,
    default: null,
  },
  tags: [String],
  votes: { type: Number, default: 0 },
  votedBy: [String],
  comments: [
    {
      text: String,
      date: {
        type: Date,
        default: Date.now,
      },
      username: String,
      userId: String,
    },
  ],
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const postModel = mongoose.model("Post", postSchema);
export default postModel;
