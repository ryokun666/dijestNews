export default async function handler(req, res) {
  const { category, country } = req.query;
  const apiKey = "68ad059b799d401b83fef24e593b8986";
  const apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}${
    category ? `&category=${encodeURIComponent(category)}` : ""
  }&pageSize=40`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("エラーが発生しました。");
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "エラーが発生しました。" });
  }
}
