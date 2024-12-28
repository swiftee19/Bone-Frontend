import "./ArticlePage.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { useApi } from "../context/ApiContext";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const { apiFetch } = useApi();

  const fetchArticles = async () => {
    try {
      const result = await apiFetch("api/articles");
      setArticles(result);
    } catch (error) {
      console.error("Error fetching articles", error);
    }
  }

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="articles-container">
      <Header />

      <Sidebar />

      <main className="content">
        <h2 className="articles-header">Articles</h2>
        <p className="sub-header">Hottest this week</p>
        <section className="articles-grid">
          {articles.map((article, index) => (
            <div key={index} className="article-card">
              <img
                src={article.image}
                alt={article.title}
                className="article-image"
              />
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Articles;
