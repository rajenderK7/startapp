import React, { useEffect, useState } from "react";
import { PencilIcon, BellIcon } from "@heroicons/react/solid";
import { BackspaceIcon } from "@heroicons/react/outline";
import Avatar from "./Avatar";
import SideNavbarItem from "../navbar/SideNavbarItem";
import Link from "next/link";
import { discoverItems, exploreItems } from "../shared/nav_items";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  const pathname = router.pathname;

  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(pathname.replace("/", ""));
  }, [pathname]);

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
            <BellIcon className="nav-icon text-white mx-2" />
            <PencilIcon className="nav-icon text-white mx-2" />
            {/* <Avatar /> */}
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