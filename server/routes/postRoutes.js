import express from "express";
import multer from "multer";
import fs from "fs";
import util from "util";
import { checkAuthorization } from "./middlewares.js";
import {
  validateNewPost,
  validateNewComment,
} from "../services/postValidationService.js";
import {
  getPost,
  createNewPost,
  deletePost,
  addComment,
  upPostVotes,
  downPostVotes,
  getTopPosts,
  searchPosts,
} from "../controllers/post.js";
import { uploadImageToBucket } from "../services/uploadImage.js";

const postRouter = express.Router();
const uploadMulter = multer({ dest: "uploads/" });
const unlinkFile = util.promisify(fs.unlink);

postRouter.use(checkAuthorization);

postRouter.post("/search", async (req, res) => {
  try {
    if (!req.body.query) {
      return res.status(200).send({ success: true, message: [] });
    }
    const returnedPosts = await searchPosts(req.body);
    return res.status(200).send({ success: true, message: returnedPosts });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Something went wrong, please try again later",
    });
  }
});

postRouter.get("/", async (req, res) => {
  try {
    const returnedPosts = await getTopPosts();
    return res.status(201).send({ success: true, message: returnedPosts });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong, please try again later",
    });
  }
});

postRouter.get("/:postId", async (req, res) => {
  try {
    const returnedPost = await getPost(req.params.postId);
    return res.status(201).send({ success: true, message: returnedPost });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong, please try again later",
    });
  }
});

postRouter.post(
  "/",
  [uploadMulter.single("image"), checkAuthorization],
  async (req, res) => {
    //Get form data
    const image = req.file;
    req.body.tags = JSON.parse(req.body.tags);
    //Validate the post data
    const { value, error } = validateNewPost(req.body);
    if (error) {
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });
    }

    try {
      //Upload image
      if (image) {
        const uploadImageResult = await uploadImageToBucket(
          image,
          req.file.mimetype
        );
        req.body.postPicURL = uploadImageResult.Location;
        await unlinkFile(image.path);
      }
      const returnedPost = await createNewPost(req.body);
      return res.status(201).send({ success: true, message: returnedPost });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        success: false,
        message: "Something went wrong, please try again later",
      });
    }
  }
);

postRouter.delete("/:postId", async (req, res) => {
  try {
    const returnedPost = await deletePost({
      _id: req.params.postId,
      username: req.body.username,
    });
    return res.status(201).send({ success: true, message: returnedPost });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong, please try again later",
    });
  }
});

postRouter.put("/comment", async (req, res) => {
  //Validate the comment data
  const { value, error } = validateNewComment(req.body);
  console.log(req.body);
  if (error) {
    return res
      .status(400)
      .send({ success: false, message: error.details[0].message });
  }

  try {
    const returnedPost = await addComment(req.body);
    return res.status(201).send({ success: true, message: returnedPost });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong, please try again later",
    });
  }
});

postRouter.patch("/upvote", async (req, res) => {
  try {
    const returnedPost = await upPostVotes(req.body);
    return res.status(201).send({ success: true, message: returnedPost });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong, please try again later",
    });
  }
});

postRouter.patch("/downvote", async (req, res) => {
  try {
    const returnedPost = await downPostVotes(req.body);
    return res.status(201).send({ success: true, message: returnedPost });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong, please try again later",
    });
  }
});

export default postRouter;
