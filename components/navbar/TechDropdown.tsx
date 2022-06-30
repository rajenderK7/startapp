import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { MenuIcon } from "@heroicons/react/outline";
import SideNavbarItem, { SideNavbarItemI } from "./SideNavbarItem";

const TechDropdown = () => {
  const [dropdown, setDropdown] = useState(false);

  const techs: SideNavbarItemI[] = [
    {
      title: "flutter",
      link: "",
      isTech: true,
    },
    {
      title: "django",
      link: "",
      isTech: true,
    },
    {
      title: "flask",
      link: "",
      isTech: true,
    },
  ];

  return (
    <div className="cursor-pointer" onClick={() => setDropdown(!dropdown)}>
      <div className="font-semibold py-2 lg:text-[14px] nav-heading flex justify-between items-center text-slate-200 ml-4">
        Top tech
        <div className="h-5 w-5 mr-2 transition-all ease-in duration-100 cursor-pointer">
          {!dropdown ? <ChevronDownIcon /> : <ChevronUpIcon />}
        </div>
      </div>
      <div
        className={`${
          dropdown ? "" : "hidden"
        } transition-all duration-700 ease-out flex-col items-center mr-1`}
      >
        {techs.map((item, index) => {
          return (
            <div key={index} className="bg-white rounded my-2">
              <SideNavbarItem
                title={item.title}
                link={item.link}
                isTech={item.isTech}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TechDropdown;
