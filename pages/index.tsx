import type { NextPage } from "next";
import { Feed, Rightbar } from "../components";

const Home: NextPage = () => {
  return (
    <>
      <div className="items-start max-w-[50rem] h-screen w-full flex">
        <Feed />
      </div>
      <Rightbar />
    </>
  );
};

export default Home;
