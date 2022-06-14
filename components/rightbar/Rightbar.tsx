import React from "react";
import Button from "../shared/Button";

const Rightbar = () => {
  return (
    <div className="relative p-6 h-screen flex-col hidden lg:flex left-auto max-w-[19rem] w-full overflow-y-auto">
      <Button title="Post starter" />
    </div>
  );
};

export default Rightbar;
