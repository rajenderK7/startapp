import Image from "next/image";
import React from "react";
import { BrandIconI } from "../interfaces/BrandIconI";

const BrandIcon = ({ src }: BrandIconI) => {
  return (
    <div className="relative h-6 w-6">
      <Image src={src} priority objectFit="contain" layout="fill" />
    </div>
  );
};

export default BrandIcon;
