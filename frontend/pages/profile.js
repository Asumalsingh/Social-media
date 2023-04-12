import React, { useContext, useEffect, useState } from "react";
import ProfileComponent from "../components/Profile";
import CreatePost from "../components/CreatePost";
import Content from "../components/Content";
import userContext from "../context/user/userContext";
import postContext from "../context/post/postContext";
import Navbar from "../components/Navbar";

export default function Profile() {
  const { user } = useContext(userContext);
  const { userPosts, getUserPosts } = useContext(postContext);

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      window.location.replace("/auth");
    }
  }, []);

  useEffect(() => {
    if (user) getUserPosts(user._id);
  }, [user]);

  return (
    <>
      <div className="fixed w-full">
        <Navbar />
      </div>
      <div className="max-w-screen-lg mx-auto px-5 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
          <div className="mb-4 col-span-1">
            {user && <ProfileComponent user={user} />}
          </div>
          <div className="col-span-2">
            <CreatePost />
            {user && userPosts && <Content posts={userPosts} user={user} />}
          </div>
        </div>
      </div>
    </>
  );
}
