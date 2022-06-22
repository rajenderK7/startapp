import React from "react";
import PostButtonLink from "../shared/PostButtonLink";

const Rightbar = () => {
  return (
    <div className="hidden lg:flex lg:flex-col lg:p-6 left-auto max-w-[19rem] w-full overflow-y-auto">
      <PostButtonLink />
    </div>
  );
};

export default Rightbar;
