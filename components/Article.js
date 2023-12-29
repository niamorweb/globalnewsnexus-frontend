import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../reducers/bookmarks";
import { hideArticle } from "../reducers/hiddenArticles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import styles from "../styles/Article.module.css";

function Article(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const handleBookmarkClick = () => {
    if (!user.token) {
      return;
    }

    fetch(
      `https://globalnewsnexus-backend.vercel.app/users/canBookmark/${user.token}`
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
    </div>
  );
}

export default Article;
