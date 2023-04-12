import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import FfModal from "./ffModal";

export default function Profile({ user }) {
  const [isActive, setIsActive] = useState(false);
  const [modalData, setModalData] = useState();
  const [title, setTitle] = useState();

  const onClickFollowers = () => {
    setModalData(user.followers);
    setTitle("Followers");
    setIsActive(true);
  };
  const onClickFollowing = () => {
    setModalData(user.following);
    setTitle("Following");
    setIsActive(true);
  };
  return (
    <>
      <div className="card w-full text-center">
        <div className="flex justify-center">
          <FaUserCircle
            size={60}
            className="cursor-pointer text-gray-500 hover:text-gray-600"
          />
        </div>

        <p className="text-xl font-semibold mt-3">{user.name}</p>
        <p>@{user.username}</p>
        <p className="text-gray-600">{user.about}</p>
        <hr className="mt-5" />
        <div className="flex justify-between p-2">
          <div className="cursor-pointer group" onClick={onClickFollowing}>
            <p className="font-semibold text-sm">{user.following.length}</p>
            <p className="text-xs group-hover:text-blue-500">Following</p>
          </div>
          <div className="cursor-pointer group" onClick={onClickFollowers}>
            <p className="font-semibold text-sm">{user.followers.length}</p>
            <p className="text-xs group-hover:text-blue-500">Followers</p>
          </div>
        </div>
        <hr className="mb-5" />

        <div className="flex justify-center">
          {/* <button className="text-black font-semibold text-sm bg-gray-100 py-2 px-4 rounded-md">
          Edit Profile
        </button> */}
          <button
            className="text-red-500 font-semibold text-sm bg-red-50 py-2 px-4 rounded-md"
            onClick={() => {
              if (confirm("Logout!")) {
                localStorage.removeItem("auth-token");
                location.replace("/");
              }
            }}
          >
            Logout
          </button>
        </div>
      </div>
      {isActive && (
        <FfModal
          setIsActive={setIsActive}
          modalData={modalData}
          title={title}
        />
      )}
    </>
  );
}
