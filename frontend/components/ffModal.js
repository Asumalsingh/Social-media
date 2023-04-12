import React, { useContext, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import userContext from "../context/user/userContext";
import AllUser from "./AllUser";

export default function FfModal({ setIsActive, modalData, title }) {
  const { exploreUser } = useContext(userContext);

  let data = [];
  for (let i = 0; i < exploreUser.length; i++) {
    if (modalData.includes(exploreUser[i]._id)) {
      data.push(exploreUser[i]);
    }
  }

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-black bg-opacity-30 transition-opacity"></div>

      <div className="fixed inset-0 h-screen flex items-center justify-center z-10 overflow-y-auto">
        <div
          style={{ height: "500px" }}
          className="card px-0 mx-4 relative h-1/2 w-80 overflow-y-auto"
        >
          <AiFillCloseCircle
            size={30}
            className="absolute text-gray-400  hover:text-gray-500 cursor-pointer  top-3 right-3"
            onClick={() => {
              setIsActive(false);
            }}
          />
          <h2 className="text-lg mx-4 my-2 font-semibold">{title}</h2>
          <hr className="" />
          <AllUser users={data} />
        </div>
      </div>
    </div>
  );
}
