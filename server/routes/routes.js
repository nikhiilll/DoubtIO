import express from "express";
import userRouter from "./userRoutes.js";
import postRouter from "./postRoutes.js";
import profileRouter from "./profileRoutes.js";

const router = express.Router();

//User Routes
router.use("/user", userRouter);

//Post related routes
router.use("/post", postRouter);

//Profile related routes
router.use("/profile", profileRouter);

export default router;
