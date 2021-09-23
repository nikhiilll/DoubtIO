import Navbar from "./navbar/navbar";
import NewPost from "./newPost";
import Timeline from "./timeline";
import PostFilter from "./postFilter";
import { useEffect, useState, useCallback } from "react";
import { PostsContextProvider } from "../../context/PostContext";
import useGetPosts from "../../hooks/useGetPosts";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-3 mx-auto sm:w-3/4 px-2">
      <Navbar />
      <PostsContextProvider>
        <div className="col-span-3 md:col-span-2 mt-20 w-full h-12 space-y-10">
          <NewPost />
          <Timeline />
        </div>
        <div className="hidden mt-20 ml-5 md:flex md:justify-center w-full">
          <PostFilter />
        </div>
      </PostsContextProvider>
    </div>
  );
};

export default Dashboard;
