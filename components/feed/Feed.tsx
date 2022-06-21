import React from "react";
import Button from "../shared/Button";
import Search from "./Search";

const Feed = () => {
  return (
    <div className="flex w-full lg:p-6 items-center mx-auto space-x-2">
      <div className="flex-1">
        {/* Search */}
        <Search />
      </div>
      <div className="lg:hidden border-r border-r-gray-400 h-8"></div>
      <div className="lg:hidden lg:w-full">
        <Button title="Post" />
      </div>
    </div>
  );
};

export default Feed;
