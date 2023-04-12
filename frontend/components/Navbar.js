import React, { useState, useContext } from "react";
import Image from "next/image";
import ChitChat from "../public/images/chit-chat.png";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";
import userContext from "../context/user/userContext";
import { FaUserCircle } from "react-icons/fa";
import { BsFillChatSquareDotsFill } from "react-icons/bs";

export default function Navbar() {
  const uContext = useContext(userContext);
  const user = uContext.user;
  return (
    <nav className="w-full px-5 py-2 flex justify-between items-center bg-white shadow-sm h-14">
      <Link href="/">
        <Image
          src={ChitChat}
          alt="logo"
          width={50}
          className="cursor-pointer"
        />
      </Link>
      <div className="flex">
        <Link
          href="/explore"
          className="bg-gray-100 text-blue-600 flex items-center px-3 rounded-full mr-5 lg:hidden"
        >
          <BiSearch size={20} />
        </Link>

        {user && (
          <div className="flex space-x-6 items-center">
            {/* <Link href="/chat">
              <BsFillChatSquareDotsFill
                size={30}
                className="cursor-pointer text-blue-500 hover:text-blue-400"
              />
            </Link> */}
            <Link href="/profile">
              <FaUserCircle
                size={40}
                className="cursor-pointer text-gray-500 hover:text-gray-600"
              />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
