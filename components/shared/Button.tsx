import React from "react";

interface ButtonI {
  type?: "submit" | "button" | "reset" | undefined;
  title: string;
  onClick?: any;
  className?: string;
  disabled?: boolean;
  children?: JSX.Element;
  color?: string;
  opacity?: number;
}

const Button = ({ type, title, onClick, className, disabled }: ButtonI) => {
  return (
    <button
      type={type ?? undefined}
      onClick={onClick}
      className={
        `${disabled ? "bg-gray-400" : "app-color"} 
        min-w-[60px] text-sm lg:text-base py-1 h-auto min-h-[24px] lg:h-8 rounded-md px-2 text-white flex items-center justify-center` +
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
