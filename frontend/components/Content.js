import React, { useContext } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import Link from "next/link";
import userContext from "../context/user/userContext";

import postContext from "../context/post/postContext";

export default function Content({ posts, user }) {
  const { likePost, deletePost } = useContext(postContext);
  const { user: loggedInUser } = useContext(userContext);

  const handleDeletePost = (id) => {
    if (confirm("Delete post!")) {
      deletePost(id);
    }
  };

  return (
    <>
      {posts.map((post, index) => {
        return (
          <div key={index} className="card mb-5">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Link
                    href={`${
                      loggedInUser._id === post.userId
                        ? "/profile"
                        : `/user/${post.userId}`
                    }`}
                  >
                    <FaUserCircle
                      size={30}
                      className="cursor-pointer text-gray-500 hover:text-gray-600"
                    />
                  </Link>
                  <p className="font-semibold ml-1">@{post.username}</p>
                </div>
                <div
                  className={`${location.pathname !== "/profile" && "hidden"}`}
                >
                  <button
                    className="bg-gray-100 text-gray-600 hover:text-red-600 rounded-full p-1 w-7 h-7"
                    onClick={() => handleDeletePost(post._id)}
                  >
                    <MdDelete size={16} className="mx-auto" />
                  </button>
                  {/* <button className="bg-gray-100 text-gray-600 rounded-full p-1 w-7 h-7 ml-2">
                    <MdEdit size={16} className="mx-auto" />
                  </button> */}
                </div>
              </div>
              <div className="flex justify-center border rounded-md ">
                <img className="" src={post.image.url} alt="Image" />
              </div>
            </div>

            <div className="flex my-2 items-center">
              <button
                onClick={() => {
                  likePost(post._id);
                }}
              >
                {post.likes.includes(user._id) ? (
                  <AiFillHeart size={40} className="text-red-500 " />
                ) : (
                  <AiOutlineHeart size={40} className="text-gray-700 " />
                )}
              </button>

              <span className="pl-1">{post.likes.length} Likes</span>
            </div>

            <p className="font-semibold">
              @{post.username}{" "}
              <span className="font-normal text-sm">
                {post.caption !== "undefined" && post.caption}
              </span>
            </p>
          </div>
        );
      })}
    </>
  );
}
