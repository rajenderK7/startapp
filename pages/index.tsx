import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
  where,
} from "firebase/firestore";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useState } from "react";
import { Rightbar } from "../components";
import Search from "../components/feed/Search";
import Post from "../components/post/Post";
import Button from "../components/shared/Button";
import { db } from "../lib/firebase/firebase";
import postToJSON from "../lib/services/postToJSON";
import PostModel from "../models/PostModel";

const POSTS_LIMIT = 10;

const Home: NextPage = ({
  serverPosts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [posts, setPosts] = useState(serverPosts);

  const [postsEnd, setPostsEnd] = useState<boolean>(false);

  const getMorePosts = async () => {
    const lastPost = posts[posts.length - 1];

    const cursor =
      typeof lastPost.createdAt === "number"
        ? Timestamp.fromMillis(lastPost.createdAt)
        : lastPost.createdAt;

    const morePostsQuery = query(
      collection(db, "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      startAfter(cursor),
      limit(POSTS_LIMIT)
    );

    const morePosts = (await getDocs(morePostsQuery)).docs.map(postToJSON);

    setPosts(posts.concat(morePosts));

    if (morePosts.length < POSTS_LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <>
      <div className="page-container">
        <div className="flex-col w-full">
          <div className="flex items-center mb-4">
            {/* Search */}
            <Search />
          </div>
          {/* Content */}
          <div className="pb-1">
            {posts?.map((post: PostModel) => {
              return <Post {...post} key={post.title} />;
            })}
          </div>
          {!postsEnd ? (
            <Button
              title="Load more posts.."
              onClick={getMorePosts}
              className="mb-3 lg:my-0"
            />
          ) : (
            <p className="text-white font-semibold">
              You have reached the end.
            </p>
          )}
        </div>
      </div>
      <Rightbar />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const postsQuery = query(
    collection(db, "posts"),
    where("published", "==", true),
    orderBy("createdAt", "desc"),
    limit(POSTS_LIMIT)
  );

  const serverPosts = (await getDocs(postsQuery)).docs.map(postToJSON);

  return {
    props: {
      serverPosts,
    },
  };
};

export default Home;
