import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { doc, increment, writeBatch } from "firebase/firestore";
import React, { useContext } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";
import { VotesProps } from "../interfaces/VoteProps";
import UserContext from "../lib/contexts/userContext";
import { db } from "../lib/firebase/firebase";

const VoteButton = ({ upVote, postRef, votes }: VotesProps) => {
  const { user, username } = useContext(UserContext);

  if (!postRef) return null;

  const upVoteRef = doc(
    db,
    "posts",
    `/${postRef}/upVotes/${user?.uid.toString()}`
  );

  const downVoteRef = doc(
    db,
    "posts",
    `/${postRef}/downVotes/${user?.uid.toString()}`
  );

  const [upVoted] = useDocument(upVoteRef);
  const [downVoted] = useDocument(downVoteRef);

  const upVoteHandler = async () => {
    if (user && username) {
      let value = 1;
      try {
        const batch = writeBatch(db);

        if (downVoted?.data()) {
          batch.delete(downVoteRef);
          if (upVoted?.data()?.uid === user?.uid) {
            value = votes == -1 ? 2 : value;
          }
        }
        batch.update(doc(db, "posts", postRef), { votes: increment(value) });
        batch.set(upVoteRef, {
          uid: user?.uid,
        });

        await batch.commit();
      } catch (err) {
        toast("Something went wrong... 😥");
      }
    } else {
      toast("Please login to vote... 😊");
    }
  };

  const downVoteHandler = async () => {
    let value = -1; // the value to be updated
    if (user && username) {
      try {
        const batch = writeBatch(db);

        if (upVoted?.data()) {
          batch.delete(upVoteRef);
          if (upVoted?.data()?.uid === user?.uid) {
            value = votes == 1 ? -2 : value;
          }
        }

        batch.update(doc(db, "posts", postRef), {
          votes: increment(value),
        });
        batch.set(downVoteRef, {
          uid: user?.uid,
        });
        await batch.commit();
      } catch (err) {
        toast("Something went wrong... 😥");
      }
    } else {
      toast("Please login to vote... 😊");
    }
  };

  return (
    <div className="text-white hover:scale-125 h-8 w-8">
      {upVote ? (
        <ChevronUpIcon
          className={`cursor-pointer hover:app-color-text ${
            upVoted?.data() ? "app-color-text" : ""
          }`}
          onClick={upVoted?.data() ? () => {} : upVoteHandler}
        />
      ) : (
        <ChevronDownIcon
          className={`cursor-pointer hover:app-color-text ${
            downVoted?.data() ? "app-color-text" : ""
          }`}
          onClick={downVoted?.data() ? () => {} : downVoteHandler}
        />
      )}
    </div>
  );
};

export default VoteButton;
