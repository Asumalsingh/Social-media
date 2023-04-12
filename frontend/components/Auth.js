import React, { useState } from "react";
import axios from "axios";
import host from "../dbConfig";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [inputData, setInputData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [warning, setWarning] = useState(false);

  // function to get input field data
  const onChangeInput = (event) => {
    setInputData({ ...inputData, [event.target.name]: event.target.value });
  };

  // function to handle login request
  const login = (e) => {
    e.preventDefault();
    axios
      .post(
        `${host}/auth/login`,
        {
          username: inputData.username,
          password: inputData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const json = response.data;
        if (json.success) {
          localStorage.setItem("auth-token", json.authToken);
          location.replace("/");
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  // function to handle signup request
  const signup = (e) => {
    setWarning(false);
    e.preventDefault();
    if (inputData.password !== inputData.confirmPassword) {
      setWarning(true);
      return;
    } else {
      axios
        .post(
          `${host}/auth/createUser`,
          {
            name: inputData.name,
            username: inputData.username,
            password: inputData.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          const json = response.data;
          if (json.success) {
            localStorage.setItem("auth-token", json.authToken);
            location.replace("/");
          }
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    }
  };
  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <div className="">
          {isLogin ? (
            // Login code
            <div className="card w-96">
              <div className="flex justify-center mb-5">
                <h1 className="font-bold text-2xl">Login</h1>
              </div>

              <form action="" onSubmit={login}>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  placeholder="Username"
                  className="w-full my-2 py-3 rounded-md border border-gray-200 bg-gray-100 focus:border-gray-300 focus:ring-0 "
                  onChange={onChangeInput}
                />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full my-2 py-3 rounded-md border border-gray-200 bg-gray-100 focus:border-gray-300 focus:ring-0 "
                  onChange={onChangeInput}
                />

                <input
                  type="submit"
                  value="Login"
                  className="bg-blue-500 cursor-pointer text-white rounded-lg w-full px-4 py-3 my-4"
                />
              </form>

              <p>
                {" "}
                Don&apos;t have an account,{" "}
                <button
                  className="text-blue-600 cursor-pointer"
                  onClick={() => setIsLogin(false)}
                >
                  Create one
                </button>
              </p>
            </div>
          ) : (
            // Login code
            <div className="card w-96">
              <div className="flex justify-center mb-5">
                <h1 className="font-bold text-2xl">Sign up</h1>
              </div>

              <form action="" onSubmit={signup}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  required
                  className="w-full my-2 py-3 rounded-md border border-gray-200 bg-gray-100 focus:border-gray-300 focus:ring-0 "
                  onChange={onChangeInput}
                />
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  required
                  className="w-full my-2 py-3 rounded-md border border-gray-200 bg-gray-100 focus:border-gray-300 focus:ring-0 "
                  onChange={onChangeInput}
                />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full my-2 py-3 rounded-md border border-gray-200 bg-gray-100 focus:border-gray-300 focus:ring-0 "
                  onChange={onChangeInput}
                />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  required
                  className="w-full my-2 py-3 rounded-md border border-gray-200 bg-gray-100 focus:border-gray-300 focus:ring-0 "
                  onChange={onChangeInput}
                />
                <p
                  className={` ${warning ? "" : "hidden"} text-sm text-red-500`}
                >
                  Password doesn&apos;t match
                </p>

                <input
                  type="submit"
                  value="Sign up"
                  className="bg-blue-500 cursor-pointer text-white rounded-lg w-full px-4 py-3 my-4"
                />
              </form>

              <p>
                Already have an account,{" "}
                <button
                  className="text-blue-600 cursor-pointer"
                  onClick={() => setIsLogin(true)}
                >
                  Login here
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
