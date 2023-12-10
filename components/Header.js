import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/user";
import { removeAllBookmark } from "../reducers/bookmarks";
import styles from "../styles/Header.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header({ isPopupConnexionVisible, setIsPopupConnexionVisible }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(removeAllBookmark());
  };

  return (
    <header className="py-5 ">
      <div className="flex justify-between items-center">
        <Link href="/">
          <span className="cursor-pointer font-black text-base lg:text-2xl">
            Global News{" "}
            <span className="bg-dark1 text-white2 px-1"> Nexus</span>{" "}
          </span>
        </Link>
        {user.token ? (
          <div className={styles.logoutSection}>
            <div className="flex gap-1 text-sm md:text-base">
              <span className="hidden md:flex">Welcome {user.username} / </span>
              <button
                className="text-red-500 text-sm md:text-base"
                onClick={() => handleLogout()}
              >
                Logout
              </button>
            </div>
            <div className="ml-5 hover:underline underline-offset-2 text-sm md:text-base">
              <Link href="/bookmarks">Bookmarks</Link>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPopupConnexionVisible(true)}
                className="hover:underline underline-offset-2 text-sm md:text-base"
              >
                Login
              </button>
            </div>
            <div className="ml-5 hover:underline underline-offset-2 text-sm md:text-base">
              <Link href="/bookmarks">Bookmarks</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
