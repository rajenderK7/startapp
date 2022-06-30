import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
} from "firebase/firestore";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import React, { useContext } from "react";
import { format } from "timeago.js";
import { AuthCheck } from "../../components";
import Button from "../../components/shared/Button";
import UserContext from "../../lib/contexts/userContext";
import { db } from "../../lib/firebase/firebase";
import postToJSON from "../../lib/services/postToJSON";

interface SideHeaderI {
  title: string;
  className?: string;
}

const SideHeader = ({ title, className }: SideHeaderI) => {
  return <h2 className={"text-white text-sm " + className}>{title}</h2>;
};

const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const createdAt = format(post.createdAt);
  const updatedAt = format(post.updatedAt);
  const { username } = useContext(UserContext);

  return (
    <div className="flex flex-col w-full mx-auto items-start px-1 lg:px-5 h-screen">
      <AuthCheck fallback={<></>}>
        {post?.username === username ? (
          <div className="flex lg:mt-4">
            <Link href={`/create/${post?.postID}`}>
              <a>
                <Button title="Edit ✏️" />
              </a>
            </Link>
          </div>
        ) : (
          <></>
        )}
      </AuthCheck>
      <div className="mb-3 w-full">
        {/* Question Header */}
        <div className="flex space-x-2 lg:mt-4 items-center">
          {/* Votes column */}
          <div className=" flex flex-col max-w-[100px] justify-center items-center">
            <ChevronUpIcon
              onClick={() => {}}
              className="text-white cursor-pointer hover:scale-125 hover:app-color-text h-8 w-8"
            />
            {/* Votes */}
            <h2 className="text-white font-bold text-lg">{post.votes}</h2>
            <ChevronDownIcon
              onClick={() => {}}
              className="text-white cursor-pointer hover:scale-125 hover:app-color-text h-8 w-8"
            />
          </div>
          {/* Title */}
          <h1 className="text-white text-[20px] lg:text-3xl">{post?.title}</h1>
        </div>
        {/* Author information */}
        <div className="lg:flex justify-between w-full text-slate-400">
          <p>
            by{" "}
            <Link href={`/${post?.username}`}>
              <a className="app-color-text font-medium">{post?.username}</a>
            </Link>
          </p>
          <div className="flex space-x-2">
            <p className="text-sm">
              Posted: <span className="text-white">{createdAt}</span>
            </p>
            <p className="text-sm">
              Updated: <span className="text-white">{updatedAt}</span>
            </p>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="flex flex-col">
        <SideHeader title="Description" className="mb-1" />
        <p className="text-slate-300">{post?.desc}</p>
      </div>
      {/* Images */}
      <div className="my-2">
        <SideHeader title="Images" />
        <div className="relative mt-2">
          <img
            src={
              post?.images[0] ??
              "https://miro.medium.com/max/798/1*LU5XQiGYjh60e6njVqEDoQ.png"
            }
            // src="https://miro.medium.com/max/798/1*LU5XQiGYjh60e6njVqEDoQ.png"
            className="object-contain max-h-[300px]"
          />
        </div>
      </div>
      {/* Download links */}
      <Button title="Download" className="my-2" />
      {/* Comments */}
      <div>
        <SideHeader title="Comments" />
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const username = context.params?.username;
  const postID = context.params?.postID;

  if (!postID) {
    return {
      notFound: true,
    };
  }

  const postRef = doc(db, "posts", postID?.toString());

  const post = postToJSON(await getDoc(postRef));

  return {
    props: {
      post,
    },
    revalidate: 1000,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postsQuery = query(collection(db, "posts"), limit(10));

  const posts = await getDocs(postsQuery);

  const paths = posts.docs.map((doc) => {
    const { username, postID } = doc.data();

    return {
      params: {
        username,
        postID,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export default Post;
