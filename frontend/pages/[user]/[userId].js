import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import UserDetail from "../../components/UserDetail";
import Content from "../../components/Content";
import postContext from "../../context/post/postContext";
import host from "../../dbConfig";
import Navbar from "../../components/Navbar";

export default function UserId() {
  const [userInfo, setUserInfo] = useState();
  const { userPosts, getUserPosts } = useContext(postContext);

  const router = useRouter();
  console.log(userInfo);

  useEffect(() => {
    if (router.query.userId) {
      // api request for user info
      axios
        .get(`${host}/user/getById/${router.query.userId}`)
        .then((response) => {
          setUserInfo(response.data);
        })
        .catch((error) => {
          alert(error.response.data.message);
        });

      // this function is defined in context api
      getUserPosts(router.query.userId);
    }
  }, [router.query.userId]);

  return (
    <>
      <div className="fixed w-full">
        <Navbar />
      </div>
      <div className="max-w-screen-lg mx-auto px-5 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
          <div className="mb-4 col-span-1">
            {userInfo && <UserDetail user={userInfo} />}
          </div>
          <div className="col-span-2">
            {userInfo && userPosts && (
              <Content posts={userPosts} user={userInfo} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
