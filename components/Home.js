import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import Article from "./Article";
import TopArticle from "./TopArticle";

function Home() {
  const bookmarks = useSelector((state) => state.bookmarks.value);
  const hiddenArticles = useSelector((state) => state.hiddenArticles.value);

  const [articlesData, setArticlesData] = useState([]);
  const [topArticle, setTopArticle] = useState({});

  useEffect(() => {
    fetch(
      "https://globalnewsnexus-backend-git-main-niamordev.vercel.app/articles"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTopArticle(data.articles[0]);
        setArticlesData(data.articles.filter((data, i) => i > 0));
      });
  }, []);

  const filteredArticles = articlesData.filter(
    (data) => !hiddenArticles.includes(data.title)
  );
  const articles = filteredArticles.map((data, i) => {
    const isBookmarked = bookmarks.some(
      (bookmark) => bookmark.title === data.title
    );
    return <Article key={i} {...data} isBookmarked={isBookmarked} />;
  });

  let topArticles;
  if (bookmarks.some((bookmark) => bookmark.title === topArticle.title)) {
    topArticles = <TopArticle {...topArticle} isBookmarked={true} />;
  } else {
    topArticles = <TopArticle {...topArticle} isBookmarked={false} />;
  }

  return (
    <div>
      <Head>
        <title>Global News Nexus - Home</title>
      </Head>
      <div className="lg:mt-10 ">
        <span className="text-black1 font-black lg:text-2xl ">Hot Topics</span>
        {topArticles}
      </div>
      <div className="mt-8 lg:mt-16 flex flex-col gap-4">
        <span className="text-black1 font-black lg:text-2xl">
          Latest Articles
        </span>
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {articles}
        </div>
      </div>
    </div>
  );
}

export default Home;
