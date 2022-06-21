import type { NextPage } from "next";
import { Feed, Rightbar } from "../components";

const Home: NextPage = () => {
  return (
    <>
      <div className="items-start border-r-gray-600 max-w-[50rem] h-screen w-full flex lg:border-r">
        <Feed />
      </div>
      <Rightbar />
    </>
  );
};

export default Home;
