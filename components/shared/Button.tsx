import React, { ButtonHTMLAttributes, HTMLProps } from "react";

interface ButtonI {
  type?: "submit" | "button" | "reset" | undefined;
  title: string;
  onClick?: any;
  className?: string;
}

const Button = ({ type, title, onClick, className }: ButtonI) => {
  return (
    <button
      type={type ?? undefined}
      onClick={onClick}
      className={
        "app-color text-sm lg:text-lg py-1 h-auto min-h-[24px] lg:h-8 font-semibold rounded-md px-2 text-white flex items-center justify-center" +
        " " +
        className
      }
    >
      {title}
    </button>
  );
};

export default Button;
