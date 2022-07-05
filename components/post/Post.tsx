import Image from "next/image";
import Link from "next/link";
import React from "react";
import { format } from "timeago.js";
import PostModel from "../../models/PostModel";

const Post = (post: PostModel) => {
  const createdAt = format(post.createdAt);

  return (
    <div className="w-full flex bg-black rounded-md my-3 shadow-md">
      {/* Votes column */}
      <div
        className={`bg-white flex flex-col max-w-[50px] w-full py-2 rounded-l-md justify-center items-center`}
      >
        <h2 className="text-black font-bold text-lg">{post?.votes}</h2>
        <p className="text-black text-xs">Votes</p>
      </div>
      {/* Main content */}
      <div className="flex flex-col lg:min-w-[530px] w-full py-2 px-3">
        <Link href={`/${post?.username}/${post?.postID}`}>
          <h1 className="app-color-text text-sm lg:text-base font-semibold mb-2 cursor-pointer">
            {post.title}
          </h1>
        </Link>
        <p className="text-slate-200 text-xs lg:text-sm max-h-16 break-words overflow-ellipsis overflow-hidden">
          {post.desc}
        </p>
        {/* Username and details mobile view */}
        <div className="border-t border-slate-500 flex lg:hidden mt-2 pt-1 justify-between">
          <Link href={`/${post?.username}`}>
            <p className="app-color-text text-xs">
              <span className="text-slate-200">by</span> {post?.username}
            </p>
          </Link>
          <p className="text-slate-200 text-xs">{createdAt}</p>
        </div>
      </div>
      {/* Actions column (img, username) */}
      <div className="hidden lg:flex flex-col text-white p-2 border-l border-l-slate-600 items-center w-full">
        <div className="relative mb-2 h-20 w-full rounded-md">
          <Image
            src={post?.images?.at(0) ?? post?.photoURL}
            alt={post?.title}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <section className="flex w-full items-center justify-center overflow-hidden">
          <div className="relative h-7 w-7 mr-2">
            <Image
              src={post?.photoURL}
              alt={post?.username}
              layout="fill"
              objectFit="contain"
              className="rounded-full"
              priority
            />
          </div>
          <div className="flex flex-col">
            <Link href={`/${post?.username}`}>
              <p className="app-color-text text-xs cursor-pointer">
                <span className="text-slate-200 overflow-ellipsis">by</span>{" "}
                {post?.username}
              </p>
            </Link>
            <p className="text-slate-200 text-[10px]">{createdAt}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Post;
