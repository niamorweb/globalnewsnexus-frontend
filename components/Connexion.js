import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/user";
import { removeAllBookmark } from "../reducers/bookmarks";
import { unhideArticles } from "../reducers/hiddenArticles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faXmark,
  faEye,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { Modal } from "antd";
import Link from "next/link";
import Moment from "react-moment";
import styles from "../styles/Header.module.css";

function Connexion({ setIsPopupConnexionVisible }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [modalVisible, setModalVisible] = useState("signin");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const handleRegister = () => {
    fetch(
      "https://globalnewsnexus-backend-b5remo86m-niamordev.vercel.app/users/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: signUpUsername,
          password: signUpPassword,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ username: signUpUsername, token: data.token }));
          setSignUpUsername("");
          setSignUpPassword("");
          setIsPopupConnexionVisible(false);
        }
      });
  };

  const handleConnection = () => {
    fetch(
      "https://globalnewsnexus-backend-b5remo86m-niamordev.vercel.app/users/signin",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: signInUsername,
          password: signInPassword,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ username: signInUsername, token: data.token }));
          setSignInUsername("");
          setSignInPassword("");
          setIsPopupConnexionVisible(false);
        }
      });
  };

  return (
    <div className="z-50 fixed top-0 left-0 backdrop-blur-sm w-screen h-screen flex justify-center items-center">
      <div className=" relative bg-white2 w-[400px] p-6  outline outline-2 outline-dark2 rounded-md">
        <button
          className="absolute z-10 top-1 right-3"
          onClick={() => setIsPopupConnexionVisible(false)}
        >
          Close
        </button>
        <div className="flex gap-5 items-center mx-auto w-fit">
          <span
            onClick={() => setModalVisible("signin")}
            className={
              modalVisible === "signin"
                ? "py-2 px-4 rounded-md font-semibold bg-dark1 text-white1"
                : "py-2 px-4 rounded-md font-semibold border-2 border-dark1 text-dark1 bg-transparent"
            }
          >
            Sign in
          </span>
          <span
            onClick={() => setModalVisible("signup")}
            className={
              modalVisible === "signup"
                ? "py-2 px-4 rounded-md font-semibold bg-dark1 text-white1"
                : "py-2 px-4 rounded-md font-semibold border-2 border-dark1 text-dark1 bg-transparent"
            }
          >
            Sign Up
          </span>
        </div>

        {modalVisible === "signup" ? (
          <div className="flex flex-col gap-4 mt-10">
            <input
              type="text"
              className="outline outline-2 outline-dark2 rounded-md px-3 py-2"
              placeholder="Username"
              id="signUpUsername"
              onChange={(e) => setSignUpUsername(e.target.value)}
              value={signUpUsername}
            />
            <input
              type="password"
              className="outline outline-2 outline-dark2 rounded-md px-3 py-2"
              placeholder="Password"
              id="signUpPassword"
              onChange={(e) => setSignUpPassword(e.target.value)}
              value={signUpPassword}
            />
            <button
              className="py-2 px-4 bg-dark1 text-white1 rounded-md font-semibold"
              id="register"
              onClick={() => handleRegister()}
            >
              Sign Up
            </button>
          </div>
        ) : (
          <div className="flex  flex-col gap-4 mt-10">
            <input
              type="text"
              placeholder="Username"
              className="outline outline-2 outline-dark2 rounded-md px-3 py-2"
              id="signInUsername"
              onChange={(e) => setSignInUsername(e.target.value)}
              value={signInUsername}
            />
            <input
              type="password"
              placeholder="Password"
              className="outline outline-2 outline-dark2 rounded-md px-3 py-2"
              id="signInPassword"
              onChange={(e) => setSignInPassword(e.target.value)}
              value={signInPassword}
            />
            <button
              className="py-2 px-4 bg-dark1 text-white1 rounded-md font-semibold"
              id="connection"
              onClick={() => handleConnection()}
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Connexion;
