import {
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthCheck, FormLabel } from "../../components";
import { db, storage } from "../../lib/firebase/firebase";
import {
  useDocumentData,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import PostModel from "../../models/PostModel";
import toast from "react-hot-toast";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import UserContext, { UserContextI } from "../../lib/contexts/userContext";
import Button from "../../components/shared/Button";
import Metatags from "../../components/Metatags";

const EditPost = () => {
  return (
    <AuthCheck>
      <div className="mt-2 max-w-[900px] mx-auto w-full flex flex-col items-center justify-center pb-5">
        <EditForm />
      </div>
    </AuthCheck>
  );
};

const EditForm = () => {
  const { user, username } = useContext(UserContext);

  const router = useRouter();
  const { slug } = router.query;

  const [loading, setLoading] = useState<boolean>(false);

  const [uploadImg, setUploadImg] = useState<any>();

  if (!slug) return <></>;

  const postRef = doc(db, "posts", slug.toString());

  const [post] = useDocumentData(postRef);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<PostModel>({
    mode: "onChange",
  });

  useEffect(() => {
    reset({ ...post });
  }, [post]);

  // return if the Auth check is bypassed.
  if (post?.username !== username) {
    return (
      <p className="text-white mx-auto my-10 font-semibold text-lg">
        Bad state
      </p>
    );
  }

  const handleUploadImg = (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setUploadImg(readerEvent.target?.result);
    };
  };

  const handleFormSubmit = async (data: any) => {
    if (loading) return;

    const createdAt = post?.createdAt;

    setLoading(true);
    try {
      const resourceLinks: string[] = [];
      resourceLinks.push(data.resourceLinks[0]);

      if (uploadImg) {
        // add image to firebase storage
        const imageRef = ref(storage, `uploads/${user?.uid}/${postRef.id}`);
        await uploadString(imageRef, uploadImg, "data_url").then(
          async (snapshot) => {
            const downloadURL = await getDownloadURL(imageRef);
            const images: string[] = [];
            images.push(downloadURL);

            // update the post in firestore
            await updateDoc(postRef, {
              ...data,
              resourceLinks,
              images,
              createdAt,
              updatedAt: serverTimestamp(),
            });
          }
        );
      } else {
        await updateDoc(postRef, {
          ...data,
          resourceLinks,
          createdAt,
          updatedAt: serverTimestamp(),
        });
      }
      reset();
      toast.success("Post created!");
      router.replace(`/${username}/${slug}`);
    } catch (err) {
      toast.error("Something went wrong...");
    }

    setLoading(false);
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(postRef);
      router.push("/profile");
    } catch (err) {
      toast.error("Something went wrong...");
    }
  };

  return (
    <div className="felx-col">
      <Metatags
        title={post?.title}
        description={post?.desc.slice(0, 201)}
        author={post?.username}
        image={post?.images.at(0)}
        url={post?.postID}
      />
      <div className="flex flex-start w-full my-3">
        <Button
          title="Delete Post"
          color="red"
          opacity={600}
          onClick={handleDelete}
        />
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* Title */}
        <FormLabel htmlFor="title" title="Title" />
        <h1
          id="title"
          className="mt-1 mb-3 leading-10 app-color-text outline-none w-full text-xl lg:text-[2.2rem] font-semibold"
        >
          {post?.title}
        </h1>
        {/* Description */}
        <FormLabel htmlFor="desc" title="Description" />
        <textarea
          {...register("desc", { required: true })}
          className="mt-1 outline-none w-full h-60 border border-black bg-white rounded-md py-1 px-2 lg:text-lg"
          id="desc"
          cols={100}
          rows={3}
        ></textarea>
        {errors.desc && <p className="text-red-500">*Required field</p>}
        {/* Upload Img */}
        <div className="flex flex-col items-start mt-1">
          <FormLabel htmlFor="desc" title="Upload Images" />
          <label className="app-color py-1 px-2 mt-2 mb-3 rounded-md text-white cursor-pointer">
            Upload
            <input
              // {...register("uploadImg")}
              name="uploadImg"
              type="file"
              id="uploadImg"
              multiple
              accept="image/x-png,image/gif,image/jpeg"
              className="hidden"
              onChange={handleUploadImg}
            />
          </label>
        </div>
        {/* Download links */}
        <FormLabel htmlFor="resourceLinks" title="Download Links" />
        <input
          type="text"
          id="resourceLinks"
          className="my-2 w-full rounded-md lg:text-lg p-1 outline-none"
          {...register("resourceLinks", { required: true })}
        />
        {errors.resourceLinks && (
          <p className="text-red-500">*Required field</p>
        )}
        <p className="text-slate-300 mb-3">
          ℹ️ Please provide github/gitlab repository links only.
        </p>
        {/* Publish */}
        <fieldset className="flex items-center space-x-2 mt-2">
          <input id="publish" type="checkbox" {...register("published")} />
          <FormLabel title="Publish" htmlFor="publish" />
        </fieldset>
        <hr className="mt-3" />
        <button
          type="submit"
          disabled={loading}
          className="mt-2 bg-green-500 px-2 py-1 lg:p-2 rounded-md text-white font-semibold"
        >
          Save changes
        </button>
      </form>
    </div>
  );
};

export default EditPost;
