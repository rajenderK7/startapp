import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import React from "react";
import Post from "../../components/post/Post";
import { getUserByUsername } from "../../lib/services/getUserRef";
import PostModel from "../../models/PostModel";

// TODO: Add meta tags

const post: PostModel = {
  uid: "",
  desc: "",
  photoURL: "",
  username: "",
  title: "",
  votes: 12,
  resourceLinks: [],
};

const Profile = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="flex items-center flex-col w-full p-3">
      <div className="relative h-28 w-28 lg:h-36 lg:w-36 mb-3">
        <Image
          className="rounded-full p-1"
          src={user?.photoURL}
          layout="fill"
          objectFit="cover"
          alt={user?.username}
        />
      </div>
      <h1 className="text-black bg-white shadow-white p-1 rounded-md text-base lg:font-lg mb-2">
        {`@${user?.username}`}
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

// SSR
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { username } = query;

  const userDoc = await getUserByUsername(username);

  const user = userDoc?.data();

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user,
    },
  };
};

export default Profile;
