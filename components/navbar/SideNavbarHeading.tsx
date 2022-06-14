import React from "react";

interface SideNavbarHeadingI {
  text: string;
}

const SideNavbarHeading = ({ text }: SideNavbarHeadingI) => {
  return (
    <div className="font-semibold py-2 lg:text-[14px] nav-heading ml-4 text-slate-200">
      {text}
    </div>
  );
};

export default SideNavbarHeading;
