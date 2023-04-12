import React, { use, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import FfModal from "./ffModal";

export default function UserDetail({ user }) {
  const [isActive, setIsActive] = useState(false);
  const [modalData, setModalData] = useState();
  const [title, setTitle] = useState();

  const onClickFollowers = () => {
    setModalData(user.followers);
    setTitle("Followers")
    setIsActive(true);
  };
  const onClickFollowing = () => {
    setModalData(user.following);
    setTitle("Following")
    setIsActive(true);
  };
  return (
    <>
      <div className="card w-full">
        <div className="flex items-center">
          <FaUserCircle
            size={60}
            className="cursor-pointer text-gray-500 hover:text-gray-600"
          />
          <div className="ml-2">
            <p className="text-xl font-semibold">{user.name}</p>
            <p>@{user.username}</p>
          </div>
        </div>
        <p className="mt-2">{user.about}</p>
        <hr className="mt-5" />
        <div className="flex justify-between p-2 text-center">
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
      </div>
      {isActive && <FfModal setIsActive={setIsActive} modalData={modalData} />}
    </>
  );
}
