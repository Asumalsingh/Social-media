import React, { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import userContext from "../context/user/userContext";
import Link from "next/link";

export default function AllUser({ users }) {
  const { followUser, user, unfollowUser } = useContext(userContext);

  const handleFollowUnfollow = (id) => {
    if (user.following.includes(id)) {
      unfollowUser(id);
    } else {
      followUser(id);
    }
  };

  return (
    <div className="card px-0 divide-y">
      {users.map((item, index) => {
        return (
          <div
            key={index}
            className="flex mx-4 my-1 justify-between py-2 items-center"
          >
            <div className="flex items-center">
              <Link href={`/user/${item._id}`}>
                <FaUserCircle
                  size={40}
                  className="cursor-pointer text-gray-500 hover:text-gray-600"
                />
              </Link>
              <div className="ml-2">
                <p className="text-xs font-semibold">{item.name}</p>
                <p className="text-xs text-gray-600">@{item.username}</p>
              </div>
            </div>
            <button
              className={`text-xs w-20 border border-blue-500  px-2 py-1 rounded-md ${
                user.following.includes(item._id)
                  ? "bg-white text-black"
                  : "bg-blue-500 text-white"
              } `}
              onClick={() => handleFollowUnfollow(item._id)}
            >
              {user.following.includes(item._id) ? "Following" : "Follow"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
