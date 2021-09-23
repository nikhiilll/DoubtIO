import express from "express";
import multer from "multer";
import fs from "fs";
import util from "util";
import { getUserData } from "../controllers/user.js";
import { getProfilePosts } from "../controllers/post.js";
import { checkAuthorization } from "./middlewares.js";
import { uploadProfileImageToBucket } from "../services/uploadImage.js";
import { validateProfileData } from "../services/userValidationService.js";
import { updateProfile } from "../controllers/user.js";

const profileRouter = express.Router();
const uploadMulter = multer({ dest: "uploads/" });
const unlinkFile = util.promisify(fs.unlink);

profileRouter.use(checkAuthorization);

profileRouter.get("/:username", async (req, res) => {
  try {
    const returnedUser = await getUserData(req.params.username);
    return res.status(201).send({ success: true, message: returnedUser });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Something went wrong, please try again later",
    });
  }
});

profileRouter.get("/posts/:username", async (req, res) => {
  try {
    const returnedPosts = await getProfilePosts(req.params.username);
    return res.status(201).send({ success: true, message: returnedPosts });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong, please try again later",
    });
  }
});

profileRouter.post(
  "/update",
  [uploadMulter.single("profileImage"), checkAuthorization],
  async (req, res) => {
    //Get form data
    const profileImage = req.file;

    //Validate the changed profile data data
    const { value, error } = validateProfileData(req.body);
    if (error) {
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });
    }

    try {
      //Upload image
      if (profileImage) {
        const uploadImageResult = await uploadProfileImageToBucket(
          profileImage,
          req.file.mimetype
        );
        req.body.profilePicURL = uploadImageResult.Location;
        await unlinkFile(profileImage.path);
      }
      const returnedProfile = await updateProfile(req.body);
      return res.status(201).send({ success: true, message: returnedProfile });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        success: false,
        message: "Something went wrong, please try again later",
      });
    }
  }
);

export default profileRouter;
