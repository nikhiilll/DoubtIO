import Post from "../models/Post.js";

export const searchPosts = async (data) => {
  let returnedSearchedPosts;
  try {
    returnedSearchedPosts = await Post.find(
      {
        $or: [
          { title: new RegExp(data.query, "i") },
          { description: new RegExp(data.query, "i") },
        ],
      },
      { _id: 1, title: 1, description: 1 }
    ).limit(5);
  } catch (err) {
    console.log(err);
  }
  return returnedSearchedPosts;
};

export const getTopPosts = async () => {
  let returnedPosts;
  try {
    returnedPosts = await Post.find()
      .sort({ createdDate: -1 })
      .limit(15)
      .select({
        username: 1,
        _id: 1,
        title: 1,
        description: 1,
        tags: 1,
        votes: 1,
      });
  } catch (err) {
    console.log(err);
  }
  return returnedPosts;
};

export const getPost = async (data) => {
  let returnedPost;
  try {
    returnedPost = await Post.findById(data);
  } catch (err) {
    console.log(err);
  }
  return returnedPost;
};

export const createNewPost = async (data) => {
  const newPost = new Post({
    userId: data.userId,
    username: data.username,
    title: data.title,
    description: data.description,
    postPicURL: data.postPicURL,
    tags: data.tags,
  });

  let returnedPost;

  try {
    returnedPost = await newPost.save();
  } catch (err) {
    console.log(err);
  }
  return returnedPost;
};

export const deletePost = async (data) => {
  let result;

  try {
    result = await Post.findOneAndDelete({
      _id: data._id,
      username: data.username,
    });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
  return result;
};

export const addComment = async (data) => {
  let returnedPost;

  try {
    returnedPost = await Post.findByIdAndUpdate(
      { _id: data.postId },
      {
        $push: { comments: data.comment },
      },
      { new: true }
    );
  } catch (err) {
    console.log(err);
  }
  return returnedPost;
};

export const upPostVotes = async (data) => {
  let returnedPost;

  try {
    returnedPost = await Post.findByIdAndUpdate(
      { _id: data.postId },
      {
        $inc: { votes: 1 },
        $push: { votedBy: data.userId },
      },
      { new: true }
    );
  } catch (err) {
    console.log(err);
  }
  return returnedPost;
};

export const downPostVotes = async (data) => {
  let returnedPost;

  try {
    returnedPost = await Post.findByIdAndUpdate(
      { _id: data.postId },
      {
        $inc: { votes: -1 },
        $pull: { votedBy: data.userId },
      },
      { new: true }
    );
  } catch (err) {
    console.log(err);
  }
  return returnedPost;
};

export const getProfilePosts = async (data) => {
  let returnedPosts;

  try {
    returnedPosts = await Post.find({
      username: data,
    });
  } catch (err) {
    console.log(err);
  }
  return returnedPosts;
};
