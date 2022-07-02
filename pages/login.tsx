import React, { useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { auth, db, googleAuthProvider } from "../lib/firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import GoogleButton from "react-google-button";
import Button from "../components/shared/Button";
import UserContext from "../lib/contexts/userContext";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import debounce from "lodash.debounce";
import useUserData from "../lib/hooks/userDataHook";
import Router, { useRouter } from "next/router";

const SignInPrompt = () => {
  const router = useRouter();
  // Use google auth provider
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
      router.back();
    } catch (error) {
      toast.error("Something went wrong... 😥");
    }
  };

  return (
    <GoogleButton label="Sign in with Google" onClick={signInWithGoogle} />
  );
};

const SignOutPrompt = () => {
  const signOutHandler = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      toast.error("Something went wrong... 😥");
    }
  };

  return <Button title="Sign Out" onClick={signOutHandler} />;
};

const UsernameForm = () => {
  const { user } = useUserData();
  const [formValue, setFormValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();

  const handleFormValue = (e: any) => {
    setFormValue(e.target.value.toString().toLowerCase());
    const re: RegExp = /^(?=[a-zA-Z0-9 ._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (formValue?.length < 3) {
      setLoading(false);
      setIsValid(false);
    } else if (re.test(formValue)) {
      setLoading(true);
      setIsValid(false);
    }
  };

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const checkUsername = useCallback(
    debounce(async (formValue: string) => {
      try {
        if (formValue.length > 3) {
          const docRef = doc(db, "usernames", formValue);
          const docSnapshot = await getDoc(docRef);

          if (!docSnapshot.exists()) {
            setIsValid(true);
          }

          setLoading(false);
        }
      } catch (err) {
        toast.error("Something went wrong... 😥");
      }
    }, 600),
    []
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (user) {
        const batch = writeBatch(db);

        const usersRef = doc(db, "users", user?.uid);

        const usernamesRef = doc(db, "usernames", formValue);

        batch.set(usersRef, {
          username: formValue,
          photoURL: user.photoURL,
          displayName: user.displayName,
        });

        batch.set(usernamesRef, {
          uid: user.uid,
        });

        await batch.commit();

        toast.success("Let's go...🚀");
        router.back();
      }
    } catch (err) {
      toast.error("Something went wrong... 😥");
    }
  };

  return (
    <div className="mt-2 w-full lg:w-[500px] flex flex-col items-center justify-center">
      <h1 className="mb-4 text-white font-semibold">
        Let's just pick a username and fly off!! 💥
      </h1>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="shadow overflow-hidden rounded-md">
          <div className="p-3 bg-slate-100 sm:p-6 w-full">
            <label
              htmlFor="first-name"
              className="text-sm font-medium text-black"
            >
              Username 🚀
            </label>
            <input
              type="text"
              name="first-name"
              id="first-name"
              autoComplete="given-name"
              onChange={handleFormValue}
              className="mt-1 p-2 block w-full shadow-md rounded-md outline-none bg-white border border-black"
            />
            {isValid && loading === false ? (
              <h3 className="text-green-600 text-sm rounded mt-1">{`${formValue} is available`}</h3>
            ) : (
              formValue.length > 3 && (
                <h3 className="text-red-600 text-sm rounded mt-1">{`${formValue} is already taken`}</h3>
              )
            )}
            <Button
              className="mt-3"
              title="Choose"
              type="submit"
              disabled={!isValid}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

const Login = () => {
  const { user, username } = useContext(UserContext);

  return (
    <div className="flex flex-col w-full mx-auto items-center mt-4 justify-center">
      <h1 className="font-semibold space-x-1 text-white">Join Startapp 😍</h1>
      <div className="my-4">
        {user ? (
          !username ? (
            <UsernameForm />
          ) : (
            <SignOutPrompt />
          )
        ) : (
          <SignInPrompt />
        )}
      </div>
    </div>
  );
};

export default Login;
