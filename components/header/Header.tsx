import React, { useContext, useEffect, useState } from "react";
import { PencilIcon, BellIcon } from "@heroicons/react/solid";
import { BackspaceIcon } from "@heroicons/react/outline";
import SideNavbarItem from "../navbar/SideNavbarItem";
import Link from "next/link";
import { discoverItems, exploreItems } from "../nav_items";
import { useRouter } from "next/router";
import Button from "../shared/Button";
import useUserData from "../../lib/hooks/userDataHook";
import Avatar from "./Avatar";
import UserContext from "../../lib/contexts/userContext";

const Header = () => {
  const router = useRouter();

  const pathname = router.pathname;

  const [currentPath, setCurrentPath] = useState("");

  const { user, username } = useContext(UserContext);

  useEffect(() => {
    setCurrentPath(pathname.replace("/", ""));
  }, [pathname, user, username]);

  return (
    <>
      <div className="h-[60px] px-2 flex bg-black sticky top-0 z-50 backdrop-blur supports-backdrop-blur:bg-white/95">
        <div className="max-w-7xl mx-auto flex flex-1 items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <a className="text-white text-lg cursor-pointer font-mono">
              Startapp
            </a>
          </Link>

          {/* Actions */}
          <div className="flex items-center">
            <BellIcon className="nav-icon text-white ml-2" />
            <PencilIcon className="nav-icon text-white ml-2" />
            {/* Login */}
            {(!user || !username) && (
              <Button
                title="Login"
                className="ml-2 lg:ml-3 lg:m-0 lg:text-md font-normal"
                onClick={() => router.push("/login")}
              />
            )}
            {/* if user is logged in */}
            {user && username && (
              <Avatar title={username} profileURL={user.photoURL} />
            )}
          </div>
        </div>
      </div>
      {/* Mobile navbar */}
      <div className="flex max-w-7xl mx-auto items-center justify-evenly w-full lg:hidden">
        {exploreItems.map((item, index) => (
          <SideNavbarItem
            key={index}
            title={item.title}
            link={item.link}
            currentPath={currentPath}
          />
        ))}
        {discoverItems.map((item, index) => (
          <SideNavbarItem
            key={index}
            title={item.title}
            link={item.link}
            currentPath={currentPath}
          />
        ))}
      </div>
    </>
  );
};

export default Header;
