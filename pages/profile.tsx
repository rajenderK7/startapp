import Image from "next/image";
import React from "react";
import Post from "../components/post/Post";

// TODO: Add dynamic content

const Profile = () => {
  return (
    <div className="flex items-center flex-col w-full p-3">
      <div className="relative h-28 w-28 lg:h-36 lg:w-36 mb-3">
        <Image
          className="rounded-full p-1"
          src="https://images.unsplash.com/photo-1655986294394-2ffc3c35b50b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h1 className="text-black bg-white shadow-white p-1 rounded-md text-base lg:font-lg mb-2">
        @rajender
      </h1>
      <div className="flex flex-col w-full  max-w-[50rem] ">
        <p className="text-sm text-slate-200">Posts</p>
        {/* Posts by the user */}
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default Profile;
