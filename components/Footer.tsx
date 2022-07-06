import React from "react";
import NextJSLogo from "../public/nextjs_logo_n.svg";
import FirebaseBLogo from "../public/firebase_logo.svg";
import BrandIcon from "./BrandIcon";

const Footer = () => {
  return (
    <div className="z-50 bg-black text-slate-300 w-full flex flex-col items-center justify-start p-4">
      <h1 className="text-sm mb-2">Built with</h1>
      <div className="flex items-center justify-center space-x-2">
        <BrandIcon src={NextJSLogo} />
        <BrandIcon src={FirebaseBLogo} />
      </div>
      <h1 className="mt-2">
        by <span className="font-semibold text-white">Rajender Katkuri</span>
      </h1>
    </div>
  );
};

export default Footer;
