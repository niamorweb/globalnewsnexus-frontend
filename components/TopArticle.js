import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../reducers/bookmarks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/TopArticle.module.css";
import { useEffect, useState } from "react";

function TopArticle(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [description, setDescription] = useState("");

  const handleBookmarkClick = () => {
    if (!user.token) {
      return;
    }

    fetch(
      `https://globalnewsnexus-backend-b5remo86m-niamordev.vercel.app/users/canBookmark/${user.token}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result && data.canBookmark) {
          if (props.isBookmarked) {
            dispatch(removeBookmark(props));
          } else {
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

  useEffect(() => {
    if (props.description) {
      const mots = props.description.split(" ");
      const premierMot = mots[0]; // Récupère le premier mot sans le retirer du tableau
      const restePhrase = props.description.slice(premierMot.length).trim(); // Récupère le reste de la phrase

      setDescription(premierMot.toUpperCase() + " " + restePhrase);
    }
  }, [props.description]);

  return (
    <div className="flex mt-3">
      <div className="relative w-full h-48 md:h-56 lg:h-80 rounded-lg overflow-hidden lg:w-[70%]">
        <img
          src={props.urlToImage}
          className="z-1 w-full h-full object-cover object-center"
          alt={props.title}
        />
        <button
          onClick={() => handleBookmarkClick()}
          className="absolute top-3 right-3 rounded-lg bg-white z-[40] px-2 py-2 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faBookmark} style={iconStyle} />
        </button>
        <div className="absolute z-10 w-full h-full top-0 left-0 bg-gradient-to-t from-dark2 via-[#acacac1a] to-[#ffffff00]"></div>
        <div className=" absolute bottom-3 left-2 right-2 md:bottom-6 md:left-5 md:right-5 lg:bottom-12 lg:left-10 lg:right-10 md:gap-2 z-20 text-white1 flex flex-col">
          <span className="lg:text-2xl">{props.title}</span>
          <div className="text-[10px] lg:text-base flex gap-2">
            <span>
              {calculateOffsetDate(props.publishedAt)} ·{" "}
              {props.source && props.source.name && props.source.name}
            </span>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex w-[30%] p-4">
        {description && <span>{description}</span>}
      </div>
    </div>
  );
}

export default TopArticle;
