import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../reducers/bookmarks";
import { hideArticle } from "../reducers/hiddenArticles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import styles from "../styles/Article.module.css";
import { useState } from "react";

function Article(props) {
  const [popupNotLogin, setPopupNotLogin] = useState(false);
  const [popupAddedToBookmark, setPopupAddedToBookmark] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const handleBookmarkClick = () => {
    if (!user.token) {
      setPopupNotLogin(true);
      setTimeout(() => {
        setPopupNotLogin(false);
      }, 2000);
      return;
    }

    fetch(
      `https://globalnewsnexus-backend.vercel.app/users/canBookmark/${user.token}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result && data.canBookmark) {
          if (props.isBookmarked) {
            setPopupAddedToBookmark("Article removed from bookmarks");
            setTimeout(() => {
              setPopupAddedToBookmark(null);
            }, 2000);
            dispatch(removeBookmark(props));
          } else {
            setPopupAddedToBookmark("Article added to bookmarks");
            setTimeout(() => {
              setPopupAddedToBookmark(null);
            }, 2000);
            dispatch(addBookmark(props));
          }
        }
      });
  };

  let iconStyle = {};
  if (props.isBookmarked) {
    iconStyle = { color: "#E9BE59" };
  }

  const calculateOffsetDate = (articleDateToEdit) => {
    const maintenant = new Date();
    const dateArticle = new Date(articleDateToEdit);
    const difference = maintenant - dateArticle;

    const secondes = Math.floor(difference / 1000);
    const minutes = Math.floor(secondes / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }
  };

  return (
    <div className="flex flex-col gap-2 relative">
      <Image
        src={props.urlToImage}
        alt={props.title}
        width={600}
        height={400}
        className="object-cover rounded-lg w-full"
      />
      <div>
        <span className="font-bold leading-[8px] text-sm ">{props.title}</span>
        <button
          onClick={() => handleBookmarkClick()}
          className="absolute top-3 right-3 rounded-lg bg-white z-[40] px-2 py-2 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faBookmark} style={iconStyle} />
        </button>
      </div>
      <span className="text-xs color-dark3">
        {" "}
        {calculateOffsetDate(props.publishedAt)} ·
        {props.source && props.source.name && props.source.name}
      </span>
      <a
        target="_blank"
        className="underline underline-offset-2 text-sm"
        href={props.url}
      >
        View article
      </a>
      {popupNotLogin && (
        <div className="bg-red-400 text-white1 font-semibold px-8 py-3 rounded-md fixed top-6 right-4">
          You need to be connected
        </div>
      )}

      {popupAddedToBookmark && (
        <div className="bg-green-600 text-white1 font-semibold px-8 py-3 rounded-md fixed top-6 right-4">
          {popupAddedToBookmark}
        </div>
      )}
    </div>
  );
}

export default Article;
