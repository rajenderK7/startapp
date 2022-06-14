import React from "react";
import SideNavbar from "./navbar/SideNavbar";
import Rightbar from "./rightbar/Rightbar";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

const Layout = ({ children }: Props) => {
  return (
    <div className="max-w-7xl mx-auto flex">
      <SideNavbar />
      <div className="relative mx-auto lg:ml-[165px] px-4 py-3 lg:p-6 max-w-[50rem] w-full flex items-start lg:border-r h-screen border-gray-600">
        {children}
      </div>
      <Rightbar />
    </div>
  );
};

export default Layout;
