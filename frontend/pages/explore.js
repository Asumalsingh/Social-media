import React, { useContext } from "react";
import Search from "../components/Search";
import AllUser from "../components/AllUser";
import userContext from "../context/user/userContext";
import Navbar from "../components/Navbar";

export default function Explore() {
  const { user, exploreUser } = useContext(userContext);
  return (
    <>
      <div className="fixed w-full">
        <Navbar />
      </div>
      <div className="max-w-screen-lg mx-auto px-5 py-16">
        <div className="flex justify-center ">
          <div className="w-96">
            <Search />
            <div className="my-2">
              {user && exploreUser && <AllUser users={exploreUser} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
