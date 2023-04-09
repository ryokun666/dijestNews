import { useState, useEffect } from "react";
import axios from "axios";

const categories = [
  "ビジネス",
  "エンターテイメント",
  "健康",
  "科学",
  "スポーツ",
  "テクノロジー",
];
const categoryMapping = {
  ビジネス: "business",
  エンターテイメント: "entertainment",
  健康: "health",
  科学: "science",
  スポーツ: "sports",
  テクノロジー: "technology",
};
const countries = [
  { code: "jp", name: "日本" },
  { code: "us", name: "アメリカ" },
  { code: "gb", name: "イギリス" },
  // 他の国を追加する場合は、ここに追記
];

export default function Home() {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("jp");
  // 記事取得用
  const [articleContent, setArticleContent] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      const englishCategory = category ? categoryMapping[category] : "";
      const response = await fetch(
        `./api/news?country=${country}${
          englishCategory ? `&category=${englishCategory}` : ""
        }`
      );
      const data = await response.json();
      setNews(data.articles);
    };
    fetchNews();
  }, [category, country]);

  // PythonとAPI連携
  const fetchArticleContent = async (title) => {
    console.log(title);

    try {
      console.log("記事取得中");
      const response = await axios.get(`/api/scrape?title=${title}`);
      console.log(response.data.text);
      setArticleContent(response.data.text);
    } catch (error) {
      setArticleContent("【エラー】記事取得に失敗しました〜！");
    }
  };

  // タイトルをPythonに送信！
  async function sendTitlesToServer(titles) {
    const url = "http://127.0.0.1:5000/save_titles";

    try {
      const response = await axios.post(url, { titles });
      return response.data;
    } catch (error) {
      console.error("Error sending titles to server:", error);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">世界のニュース</h1>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="bg-white border border-gray-300 py-2 px-4 mb-6 rounded-md"
      >
        <option value="">すべてのカテゴリ</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="bg-white border border-gray-300 py-2 px-4 mb-6 rounded-md"
      >
        {countries.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name}
          </option>
        ))}
      </select>

      <ul>
        {news.map((article, index) => (
          <li key={index} className="mb-4">
            <button
              onClick={() => sendTitlesToServer(article.title)}
              className="text-blue-500 hover:text-blue-700"
            >
              {article.title}
            </button>
          </li>
        ))}
      </ul>
      {articleContent && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">記事内容</h2>
          <p className="text-justify whitespace-pre-wrap">{articleContent}</p>
        </div>
      )}
    </div>
  );
}
