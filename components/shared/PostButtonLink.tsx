import Link from "next/link";
import React from "react";
import Button from "./Button";

const PostButtonLink = () => {
  return (
    <Link href="/write-post">
      <a>
        <Button title="Post" />
      </a>
    </Link>
  );
};

export default PostButtonLink;
