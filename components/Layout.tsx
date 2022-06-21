import React from "react";
import SideNavbar from "./navbar/SideNavbar";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

const Layout = ({ children }: Props) => {
  return (
    <div className="max-w-7xl mx-auto flex">
      <SideNavbar />
      <div className="relative mx-auto lg:ml-[165px] p-3 lg:p-0 w-full flex items-start justify-center">
        {children}
      </div>
    </div>
  );
};

export default Layout;
