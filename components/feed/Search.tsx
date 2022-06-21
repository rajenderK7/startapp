import React, { useRef, useState } from "react";
import { SearchIcon, XIcon } from "@heroicons/react/solid";
import { FieldValues, useForm } from "react-hook-form";

const Search = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  // const [searchText, setSearchText] = useState("");

  const searchText = useRef();

  const onSubmitHandler = (searchObj: FieldValues) => {
    console.log(searchObj.search);
    reset();
  };

  const handleClear = () => reset();

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex items-center bg-white px-2 rounded-[28px] mx-auto w-full md:max-w-[400px] lg:max-w-xl lg:w-full"
    >
      <SearchIcon className="icon" />
      <input
        className="outline-none px-2 py-2 lg:p-0 bg-transparent flex-1 border-none text-sm "
        type="text"
        id="search"
        placeholder="Search something..."
        {...register("search")}
      />
      <XIcon
        className="h-5 w-5 mr-1 cursor-pointer text-gray-500"
        onClick={handleClear}
      />
      <button type="submit" hidden />
    </form>
  );
};

export default Search;
