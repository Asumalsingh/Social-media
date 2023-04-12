import React, { useEffect, useContext } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Content from "../components/Content";
import CreatePost from "../components/CreatePost";
import Search from "../components/Search";
import AllUser from "../components/AllUser";
import postContext from "../context/post/postContext";
import userContext from "../context/user/userContext";
import Auth from "../components/Auth";
import Navbar from "../components/Navbar";

export default function Home() {
  const { timelinePost } = useContext(postContext);
  const { user, exploreUser } = useContext(userContext);

  return (
    <>
      <div className="fixed w-full">
        <Navbar />
      </div>
      <div className="max-w-screen-lg mx-auto px-5 py-16">
        <Head>
          <title>Chit-Chat</title>
          <meta
            name="description"
            content="Get connect to your friend with chit-chat"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {user ? (
          <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="col-span-2">
              <CreatePost />
              {timelinePost && user && (
                <Content posts={timelinePost} user={user} />
              )}
            </div>
            <div className="hidden lg:block col-span-1">
              <Search />
              <div className="my-2">
                {user && exploreUser && <AllUser users={exploreUser} />}
              </div>
            </div>
          </div>
        ) : (
          <Auth />
        )}
      </div>
    </>
  );
}
