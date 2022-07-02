import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import React from "react";
import toast from "react-hot-toast";

interface VoteDummyI {
  upVote: boolean;
}

const VoteDummy = ({ upVote }: VoteDummyI) => {
  const clickHandler = () => {
    toast("Please login to vote..😊");
  };

  return (
    <div onClick={clickHandler}>
      {upVote ? (
        <ChevronUpIcon
          onClick={() => {}}
          className="text-white cursor-pointer hover:scale-125 hover:app-color-text h-8 w-8"
        />
      ) : (
        <ChevronDownIcon
          onClick={() => {}}
          className="text-white cursor-pointer hover:scale-125 hover:app-color-text h-8 w-8"
        />
      )}
    </div>
  );
};

export default VoteDummy;
