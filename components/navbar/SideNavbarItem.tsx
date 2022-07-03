import Link from "next/link";
import React from "react";

export interface SideNavbarItemI {
  title: string;
  link?: string;
  currentPath?: string;
  isTech?: boolean | false;
}

const SideNavbarItem = ({
  title,
  link,
  currentPath,
  isTech,
}: SideNavbarItemI) => {
  return (
    <Link href={`/${link}`}>
      <a
        className={`${
          currentPath === link
            ? "lg:app-color text-white"
            : !isTech
            ? "text-slate-400 hover:text-white"
            : "text-black my-2"
        } duration-100 ease-in transition-all text-[14px] h-8 lg:py-3 flex items-center rounded-l-md lg:pl-4 cursor-pointer`}
      >
        {title}
      </a>
    </Link>
  );
};

export default SideNavbarItem;
