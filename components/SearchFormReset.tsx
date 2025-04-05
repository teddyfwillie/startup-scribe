"use client";
import { X } from "lucide-react";
import Link from "next/link";

const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;
    if (form) {
      form.reset();
    }
  };
  return (
    <button
      type="reset"
      onClick={reset}
      className="size-[50px] rounded-full bg-black flex justify-center items-center text-white"
    >
      <Link
        href="/"
        className="size-[50px] rounded-full bg-black flex justify-center items-center"
      >
        <X size={24} color="white" />
      </Link>
    </button>
  );
};

export default SearchFormReset;
