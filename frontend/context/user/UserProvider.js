import React, { useState, useEffect } from "react";
import userContext from "./userContext";
import axios from "axios";
import host from "../../dbConfig";

export default function UserProvider(props) {
  const [user, setUser] = useState(null);
  const [exploreUser, setExploreUser] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      getUser();
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      getAllUser();
    }
  }, [search, user]);

  // Get logged in user
  const getUser = () => {
    axios({
      method: "post",
      url: `${host}/user/getUser`,
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  // Get all users
  const getAllUser = () => {
    if (user) {
      axios({
        method: "get",
        url: `${host}/user/all?search=${search}`,
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      })
        .then((response) => {
          // Filter users ( get all users except current user )
          const filtered = response.data.filter(
            (element) => element._id !== user._id
          );
          setExploreUser(filtered);
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    }
  };

  // follow a user
  const followUser = (id) => {
    axios({
      method: "put",
      url: `${host}/user/follow/${id}`,
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  // unfollow a user
  const unfollowUser = (id) => {
    axios({
      method: "put",
      url: `${host}/user/unfollow/${id}`,
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <userContext.Provider
      value={{ user, exploreUser, followUser, unfollowUser, setSearch }}
    >
      {props.children}
    </userContext.Provider>
  );
}
