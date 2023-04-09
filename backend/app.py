from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
print("🚀サーバー起動中！！！！")


@app.route('/save_titles', methods=['POST'])
@cross_origin()
def save_titles():
    print("バックエンド側きた！！！！")

    print(request.args.get('title'))
    print("わわわわわ")
    title = request.args.get('title')
    url = "https://www.bbc.com/mediacentre/2023/beyond-paradise-series-2-christmas-special"
    print(title)

    if not url:
        return jsonify({"error": "URL parameter is required"}), 400

    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    # 記事本文を含むタグを見つける（以下は一般的な例ですが、実際のタグはウェブサイトによって異なります）
    article_body = soup.find("div", {"class": "article-body"})

    # 見つかったタグがない場合、空の文字列を返す
    if not article_body:
        return jsonify({"error": "Article content not found"}), 404

    # 記事本文を含むタグからテキストを抽出し、改行で連結する
    paragraphs = article_body.find_all("p")
    text = "\n".join(p.get_text() for p in paragraphs)
    print({"text": text})

    return jsonify({"text": text})


if __name__ == '__main__':
    app.run(debug=True)
