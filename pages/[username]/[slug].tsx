import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React from "react";
import Button from "../../components/shared/Button";
import PostModel from "../../models/PostModel";

const Post = (post: PostModel) => {
  return (
    <div className="flex flex-col w-full mx-auto items-start px-1 lg:px-5 h-screen">
      <div className="mb-3">
        {/* Question Header */}
        <div className="flex space-x-2 lg:mt-4 items-center">
          {/* Votes column */}
          <div className=" flex flex-col max-w-[100px] justify-center items-center">
            <ChevronUpIcon
              onClick={() => {}}
              className="text-white cursor-pointer hover:scale-125 hover:app-color-text h-8 w-8"
            />
            <h2 className="text-white font-bold text-lg">7</h2>
            <ChevronDownIcon
              onClick={() => {}}
              className="text-white cursor-pointer hover:scale-125 hover:app-color-text h-8 w-8"
            />
          </div>
          {/* Title */}
          <h1 className="text-white text-[20px] lg:text-3xl">
            Django E-commerce scalable folder structure following MVC pattern
          </h1>
        </div>
        {/* Author information */}
        <div className="flex justify-between w-full text-slate-400">
          <p>
            by{" "}
            <Link href="/">
              <a className="app-color-text">username</a>
            </Link>
          </p>
          <p>12 Mar, 2018</p>
        </div>
      </div>
      {/* Description */}
      <div className="flex flex-col">
        <h2 className="text-semibold text-white">Description</h2>
        <p className="text-slate-300">
          The folder structure is highly scalable with robust design and minimal
          ambiguity. The structure is suitable for almost any kind of e-commerce
          application. The MVC pattern helps in seperating the bussiness and
          logic part in a clean way.
        </p>
      </div>
      {/* Images */}
      <div className="my-2">
        <h2 className="text-semibold text-white">Images</h2>
        <div className="relative mt-2">
          <img
            // src="https://techvidvan.com/tutorials/wp-content/uploads/sites/2/2021/06/Django-file-structure.jpg"
            // alt="image"
            src="https://miro.medium.com/max/798/1*LU5XQiGYjh60e6njVqEDoQ.png"
            className="object-contain max-h-[300px]"
          />
        </div>
      </div>
      {/* Download links */}
      <Button title="Download" className="my-2" />
      {/* Comments */}
      <div>
        <h2 className="text-semibold text-white">Comments</h2>
      </div>
    </div>
  );
};

export default Post;
