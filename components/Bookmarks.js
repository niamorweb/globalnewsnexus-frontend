import { useSelector } from "react-redux";
import Head from "next/head";
import Article from "./Article";
import styles from "../styles/Bookmarks.module.css";

function Bookmarks() {
  const bookmarks = useSelector((state) => state.bookmarks.value);

  let articles = <p>No article</p>;
  if (bookmarks.length > 0) {
    articles = bookmarks.map((data, i) => {
      return <Article key={i} inBookmarks={true} {...data} isBookmarked />;
    });
  }

  return (
    <div>
      <Head>
        <title>Global News Nexus - Bookmarks</title>
      </Head>
      <div className="flex flex-col gap-5 lg:mt-10">
        <span className="text-black1 font-black lg:text-2xl">My bookmarks</span>
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {articles}
        </div>
      </div>
    </div>
  );
}

export default Bookmarks;
