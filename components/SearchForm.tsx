import React from "react";
import Form from "next/form"; // Note: Correct import for Next.js Form
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form
      action="/"
      scroll={false}
      className="search-form max-w-3xl w-full min-h-[80px] bg-white border-[5px] border-black rounded-[80px] text-[24px] mt-8 px-5 flex flex-row items-center gap-5"
    >
      <input
        name="query" // Added proper name attribute for form submission
        defaultValue={query}
        className="flex-1 font-bold placeholder:font-semibold placeholder:text-black-100 w-full h-auto outline-none"
        placeholder="Search Startup"
        type="text"
      />
      <div className="flex gap-2">
        {query && <SearchFormReset />}
        <button
          type="submit"
          className="size-[50px] rounded-full bg-black flex justify-center items-center text-white"
        >
          <Search size={24} color="white" />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
