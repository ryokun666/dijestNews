import axios from "axios";

export default async function handler(req, res) {
  console.log("scrape.jsきた！！！");
  const { url } = req.query;
  console.log(url);

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

    try {
    const response = await axios.get(
      `http://127.0.0.1:5000/scrape?url=${encodeURIComponent(url)}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching article content" });
  }
}
