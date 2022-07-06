import React from "react";
import JSXProps from "../interfaces/JSXProps";
import SideNavbar from "./navbar/SideNavbar";

const Layout = ({ children }: JSXProps) => {
  return (
    <div className="max-w-7xl mx-auto flex">
      <SideNavbar />
      <div className="relative mx-auto lg:ml-[165px] px-3 lg:p-0 w-full flex lg:border-l border-l-gray-600">
        {children}
      </div>
    </div>
  );
};

export default Layout;
