import React, { useContext } from "react";
import { BiSearch } from "react-icons/bi";

import userContext from "../context/user/userContext";

export default function Explore() {
  const { setSearch } = useContext(userContext);

  return (
    <>
      <div className="flex items-center card px-2 py-4">
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Explore"
          onChange={(e) => {
            if (e.target.value.length > 2) setSearch(e.target.value);
            else setSearch("");
          }}
          className="w-full placeholder:text-slate-400 py-2 rounded-md border border-gray-200 bg-gray-100 focus:border-blue-500 focus:ring-0 "
        />
        <button className="bg-blue-500 py-2 px-3 rounded-md">
          <BiSearch size={25} color="white" />
        </button>
      </div>
    </>
  );
}
