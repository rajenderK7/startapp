import Link from "next/link";
import React from "react";

export interface SideNavbarItemI {
  title: string;
  link?: string;
  currentPath?: string;
}

const SideNavbarItem = ({ title, link, currentPath }: SideNavbarItemI) => {
  return (
    <Link href={`/${link}`}>
      <a
        className={`${
          currentPath === link ? "lg:app-color text-white" : "text-slate-400"
        } duration-100 ease-in transition-all text-[14px] h-8 my-2 lg:py-3 flex items-center rounded-l-md lg:pl-4 cursor-pointer`}
      >
        {title}
      </a>
    </Link>
  );
};

export default SideNavbarItem;