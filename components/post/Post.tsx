import React from "react";

// TODO: Add alt to all the images with corresponding values
// TODO: Add formatted date
// TODO: Remove hard coded images

const Post = () => {
  return (
    <div className="w-full flex bg-black rounded-md my-3 shadow-md">
      {/* Votes column */}
      <div
        className={`bg-white flex flex-col max-w-[100px] p-2 rounded-l-md justify-center items-center`}
      >
        <h2 className="text-black font-bold text-lg">7</h2>
        <p className="text-black text-xs">votes</p>
      </div>
      {/* Main content */}
      <div className="flex flex-col lg:min-w-[530px] w-full py-2 px-3">
        <h1 className="app-color-text text-sm lg:text-base font-semibold mb-2">
          I dont know this is a test I dont know this is a test I dont know this
          is a test I dont know this is a test
        </h1>
        <p className="text-slate-200 text-xs lg:text-sm max-h-14 break-words overflow-ellipsis overflow-hidden">
          I dont know this is a test I dont know this is a test I dont know this
          is a test I dont know this is a test I dont know this is a test I dont
          know this is a test I dont know this is a test I dont know this is a
          is a test
        </p>
        {/* Username and details mobile view */}
        <div className="border-t border-slate-500 flex lg:hidden mt-2 pt-1 justify-between">
          <p className="app-color-text text-xs">
            <span className="text-slate-200">by</span> username
          </p>
          <p className="text-slate-200 text-xs">on Mar 27, 2011</p>
        </div>
      </div>
      {/* Actions column (img, username) */}
      <div className="hidden lg:flex flex-col text-white p-2 border-l border-l-slate-600 items-center w-full">
        <p className="text-slate-200 text-sm">
          <img
            src="https://play-lh.googleusercontent.com/I-Yd5tJnxw7Ks8FUhUiFr8I4kohd9phv5sRFHG_-nSX9AAD6Rcy570NBZVFJBKpepmc=w240-h480-rw"
            alt="username"
            className="rounded-md mb-2 h-20 w-full"
          />
        </p>
        <section className="flex w-full items-center justify-start  overflow-hidden">
          <img
            src="https://play-lh.googleusercontent.com/I-Yd5tJnxw7Ks8FUhUiFr8I4kohd9phv5sRFHG_-nSX9AAD6Rcy570NBZVFJBKpepmc=w240-h480-rw"
            alt="username"
            className="rounded-full h-7 w-7 mr-2"
          />
          <div className="flex flex-col">
            <p className="app-color-text text-xs">
              <span className="text-slate-200 overflow-ellipsis">by</span>{" "}
              username
            </p>
            <p className="text-slate-200 text-[10px]">on Mar 27, 2011</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Post;
