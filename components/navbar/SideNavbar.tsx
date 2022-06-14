import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { discoverItems, exploreItems } from "../shared/nav_items";
import SideNavbarHeading from "./SideNavbarHeading";
import SideNavbarItem from "./SideNavbarItem";

const SideNavbar = () => {
  const router = useRouter();

  const pathname = router.pathname;

  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(pathname.replace("/", ""));
  }, [pathname]);

  return (
    <div className="hidden h-screen lg:border-r border-r-gray-600 lg:block lg:fixed z-50 top-[60px] right-auto w-[165px] py-3 overflow-y-auto">
      <SideNavbarHeading text="Explore" />
      {exploreItems.map((item, index) => (
        <SideNavbarItem
          key={index}
          title={item.title}
          link={item.link}
          currentPath={currentPath}
        />
      ))}
      <SideNavbarHeading text="Discover" />
      {discoverItems.map((item, index) => (
        <SideNavbarItem
          key={index}
          title={item.title}
          link={item.link}
          currentPath={currentPath}
        />
      ))}
    </div>
  );
};

export default SideNavbar;
