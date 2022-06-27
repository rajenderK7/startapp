import Link from "next/link";
import React, { useContext } from "react";
import JSXProps from "../interfaces/JSXProps";
import UserContext from "../lib/contexts/userContext";

// TODO: Make props type/interface a shared one it is also used in Layout.tsx

const AuthCheck = ({ children, fallback }: JSXProps): JSX.Element | null => {
  const { username } = useContext(UserContext);

  return username
    ? children
    : fallback || (
        <Link href="/login" className="cursor-pointer">
          <a className="app-color rounded-sm p-2 text-white mx-auto mt-20">
            Please login to continue 🏃‍♂️
          </a>
        </Link>
      );
};

export default AuthCheck;
