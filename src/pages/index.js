import { useState, useEffect } from "react";

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
  // 他の国を追加する場合は、ここに追記してください
];

export default function Home() {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("jp");

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
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
