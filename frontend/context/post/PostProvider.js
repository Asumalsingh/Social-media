import React, { useState, useEffect } from "react";
import postContext from "./postContext";
import axios from "axios";
import host from "../../dbConfig";

export default function PostProvider(props) {
  const [timelinePost, setTimelinePost] = useState();
  const [userPosts, setUsetPosts] = useState();
  const [uploading, setUploading] = useState();

  useEffect(() => {
    getTimelinePost();
    // getUserPosts();
  }, []);

  // Create post
  const createPost = (image, caption) => {
    const formdata = new FormData();
    formdata.append("image", image);
    formdata.append("caption", caption);

    if (localStorage.getItem("auth-token")) {
      axios
        .post(`${host}/post/createPost`, formdata, {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        })
        .then((response) => {
          const json = response.data;
          setTimelinePost([json].concat(timelinePost));
          setUsetPosts([json].concat(userPosts));
          setUploading(false);
        })
        .catch((error) => {
          // alert(error.response.data.message);
        });
    }
  };

  // Get timeline post
  const getTimelinePost = () => {
    if (localStorage.getItem("auth-token")) {
      axios
        .get(`${host}/post/timelinePost`, {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        })
        .then((response) => {
          setTimelinePost(response.data);
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    }
  };

  // Get all post of user of given id
  const getUserPosts = (userId) => {
    if (localStorage.getItem("auth-token")) {
      axios
        .get(`${host}/post/getAllPost/${userId}`, {
          headers: { "auth-token": localStorage.getItem("auth-token") },
        })
        .then((response) => {
          setUsetPosts(response.data);
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    }
  };

  // Like dislike a post
  const likePost = (id) => {
    if (localStorage.getItem("auth-token")) {
      axios
        .put(`${host}/post/like/${id}`, null, {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        })
        .then((response) => {
          let temp = [...timelinePost];
          for (let obj of temp) {
            if (obj._id === id) {
              obj.likes = [...response.data.likes];
            }
          }
          setTimelinePost(temp);

          if (userPosts) {
            let tempUserPost = [...userPosts];
            for (let obj of tempUserPost) {
              if (obj._id === id) {
                obj.likes = [...response.data.likes];
              }
            }
            setUsetPosts(tempUserPost);
          }
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    }
  };

  // Delete a post
  const deletePost = (id) => {
    const uPost = userPosts.filter((post) => {
      return post._id !== id;
    });

    const tPost = timelinePost.filter((post) => {
      return post._id !== id;
    });

    setTimelinePost(tPost);
    setUsetPosts(uPost);
    axios
      .delete(`${host}/post/deletePost/${id}`, {
        headers: { "auth-token": localStorage.getItem("auth-token") },
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <postContext.Provider
      value={{
        createPost,
        timelinePost,
        getUserPosts,
        userPosts,
        likePost,
        deletePost,
        uploading,
        setUploading,
      }}
    >
      {props.children}
    </postContext.Provider>
  );
}
