import Link from "next/link";
import React from "react";
import Button from "./Button";

const PostButtonLink = () => {
  return (
    <Link href="/create">
      <a>
        <Button title="Post" />
      </a>
    </Link>
  );
};

export default PostButtonLink;
