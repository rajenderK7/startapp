import React, { ButtonHTMLAttributes, HTMLProps } from "react";

interface ButtonI {
  type?: "submit" | "button" | "reset" | undefined;
  title: string;
  onClick?: any;
  className?: string;
  disabled?: boolean;
}

const Button = ({ type, title, onClick, className, disabled }: ButtonI) => {
  return (
    <button
      type={type ?? undefined}
      onClick={onClick}
      className={
        `${
          disabled ? "bg-gray-400" : "app-color"
        } min-w-[60px] text-sm lg:text-lg py-1 h-auto min-h-[24px] lg:h-8 font-semibold rounded-md px-2 text-white flex items-center justify-center` +
        " " +
        className
      }
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
