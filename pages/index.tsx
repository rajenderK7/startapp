import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Link from "next/link";
import { Rightbar } from "../components";
import Search from "../components/feed/Search";
import Post from "../components/post/Post";
import Button from "../components/shared/Button";
import { db } from "../lib/firebase/firebase";
import postToJSON from "../lib/services/postToJSON";
import PostModel from "../models/PostModel";

const Home: NextPage = ({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <div className="items-start max-w-[50rem] h-screen w-full flex">
        <div className="h-screen flex-col w-full lg:p-6 ">
          <div className="flex items-center mx-auto mb-4 space-x-2">
            <div className="flex-1">
              {/* Search */}
              <Search />
            </div>
            <div className="lg:hidden border-r border-r-gray-400 h-8"></div>
            <div className="lg:hidden lg:w-full">
              <Link href="/create">
                <a>
                  <Button title="Post" />
                </a>
              </Link>
            </div>
          </div>
          {/* Content */}
          <div className="">
            {posts?.map((post: PostModel) => {
              return <Post {...post} key={post.title} />;
            })}
          </div>
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
    limit(10)
  );

  const posts = (await getDocs(postsQuery)).docs.map(postToJSON);

  return {
    props: {
      posts,
    },
  };
};

export default Home;
