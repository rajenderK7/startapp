import React from "react";
import Post from "../post/Post";
import Button from "../shared/Button";
import Search from "./Search";

const Feed = () => {
  return (
    <div className="h-screen flex-col w-full lg:p-6 ">
      <div className="flex items-center mx-auto mb-4 space-x-2">
        <div className="flex-1">
          {/* Search */}
          <Search />
        </div>
        <div className="lg:hidden border-r border-r-gray-400 h-8"></div>
        <div className="lg:hidden lg:w-full">
          <Button title="Post" />
        </div>
      </div>
      {/* Content */}
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default Feed;
