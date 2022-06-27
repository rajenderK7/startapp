import React, { useContext, useState } from "react";
import { AuthCheck } from "../../components";
import Button from "../../components/shared/Button";
import kebabCase from "lodash.kebabcase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase/firebase";
import UserContext from "../../lib/contexts/userContext";
import PostModel from "../../models/PostModel";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const CreatePost = () => {
  const router = useRouter();

  const { user, username } = useContext(UserContext);

  const [title, setTitle] = useState("");

  const slug: string = encodeURI(kebabCase(title));

  const isValid: boolean = slug.length > 3 && slug.length < 150;

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const postID = `${slug}-${username}`;

    // create a firestore doc
    const ref = doc(db, "posts", postID);

    if (!username || !user?.uid) {
      toast("Something went wrong!", { icon: "😩" });
      return;
    }

    const post: PostModel = {
      uid: user?.uid,
      postID,
      title,
      username,
      photoURL: user?.photoURL ?? "",
      desc: "Hello World!",
      published: false,
      votes: 0,
      images: [],
      resourceLinks: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    try {
      await setDoc(ref, post);
      toast.success("Let's go!");
      router.replace(`create/${postID}`);
    } catch (err) {
      toast("Something went wrong!", { icon: "😩" });
    }
  };

  return (
    <AuthCheck>
      <div className="mt-2 w-full lg:w-[700px] flex flex-col items-center justify-center mx-auto">
        <h1 className="mb-2 text-white font-semibold">
          Please pick a title that is concise yet meaningful
        </h1>
        <h1 className="mb-4 text-white font-semibold">
          ℹ️ Mind that your post's title will be the URL
        </h1>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="shadow overflow-hidden rounded-md">
            <div className="p-3 bg-slate-100 sm:p-6 w-full">
              <label htmlFor="title" className="text-sm font-medium text-black">
                Post title 🦄
              </label>
              <textarea
                name="title"
                id="title"
                className="mt-1 p-2 block w-full shadow-md rounded-md outline-none bg-white border border-black"
                onChange={(e) => setTitle(e.target.value)}
              />
              <p className="mt-2">{`URL: ${slug}`}</p>
              <Button
                className="mt-2"
                title="Next"
                type="submit"
                disabled={!isValid}
              />
            </div>
          </div>
        </form>
      </div>
    </AuthCheck>
  );
};

export default CreatePost;
