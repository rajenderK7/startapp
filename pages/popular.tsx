import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import React from "react";
import Post from "../components/post/Post";
import { db } from "../lib/firebase/firebase";
import postToJSON from "../lib/services/postToJSON";
import PostModel from "../models/PostModel";

const Popular: NextPage = ({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="page-container">
      <div className="pb-1">
        {posts?.map((post: PostModel) => {
          return <Post {...post} key={post?.title} />;
        })}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const popularPostsQuery = query(
    collection(db, "posts"),
    where("published", "==", true),
    orderBy("votes", "desc"),
    limit(10)
  );

  const posts = (await getDocs(popularPostsQuery)).docs.map(postToJSON);

  return {
    props: {
      posts,
    },
  };
};

export default Popular;
