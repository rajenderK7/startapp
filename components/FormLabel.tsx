import React from "react";

interface LabelI {
  htmlFor: string;
  title: string;
}

const FormLabel = ({ htmlFor, title }: LabelI) => {
  return (
    <label htmlFor={htmlFor} className="text-slate-200 font-medium lg:text">
      {title}
    </label>
  );
};

export default FormLabel;
