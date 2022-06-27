import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import React from "react";
import Post from "../../components/post/Post";
import { db } from "../../lib/firebase/firebase";
import { getUserByUsername } from "../../lib/services/getUserRef";
import postToJSON from "../../lib/services/postToJSON";
import PostModel from "../../models/PostModel";

// TODO: Add meta tags

// const post: PostModel = {
//   uid: "",
//   desc: "",
//   photoURL: "",
//   username: "",
//   title: "",
//   votes: 12,
//   resourceLinks: [],
// };

const Profile = ({
  user,
  posts,
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
        {posts.map((post: PostModel) => {
          return <Post {...post} key={post.uid} />;
        })}
      </div>
    </div>
  );
};

// SSR
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.query;

  const userDoc = await getUserByUsername(username);

  const user = userDoc?.data();

  const q = query(collection(db, "posts"), where("username", "==", username));

  const posts = (await getDocs(q)).docs.map(postToJSON);

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user,
      posts,
    },
  };
};

export default Profile;
