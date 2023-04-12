import React, { useState, useContext } from "react";
import { AiFillPlusCircle } from "react-icons/ai";

import postContext from "../context/post/postContext";

export default function CreatePost() {
  const [image, setImage] = useState();
  const [caption, setCaption] = useState();

  const { createPost, uploading, setUploading } = useContext(postContext);

  const onImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader(null);

    // transfort image
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    } else {
      setImage(null);
    }
  };

  const sharePost = () => {
    setUploading(true);
    createPost(image, caption);
    setImage(null);
  };

  return (
    <>
      <div className="card mb-5">
        {image && (
          <div className="border rounded-md flex justify-center">
            <img src={image} alt="image-review" />
          </div>
        )}
        <div className="">
          <div className="my-3 flex space-x-2 item-center">
            <div>
              <label htmlFor="img" className="cursor-pointer flex">
                <AiFillPlusCircle
                  size={44}
                  className="text-blue-500 cursor-pointer"
                />
              </label>
              <input
                hidden
                type="file"
                id="img"
                name="img"
                accept="image/*"
                onChange={onImageChange}
              />
            </div>

            <input
              className="placeholder:text-slate-400 w-full block rounded-md border border-gray-50 bg-gray-50 focus:border-gray-100 focus:ring-0"
              placeholder="Write something creative. . . "
              type="search"
              name="caption"
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
          <div className="flex justify-end items-center">
            {image && (
              <div className="flex">
                <button
                  className="border bg-white px-3 py-1 mx-2 rounded-md"
                  onClick={() => {
                    setImage(null);
                  }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="bg-blue-500 text-white px-3 py-1 rounded-md"
                  onClick={sharePost}
                >
                  Share
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {uploading && (
        <div className="flex justify-center mb-3 font-semibold">
          <p>Uploading. . .</p>
        </div>
      )}
    </>
  );
}
