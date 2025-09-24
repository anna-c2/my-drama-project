# run python3 scraper.py
import requests
from bs4 import BeautifulSoup
import re
import json

BASE_URL = "https://m.imdb.com/search/title/?keywords=chinese-drama&explore=keywords"

def scrape_imdb_chinese_dramas():
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/140.0.0.0 Safari/537.36"
        )
    }

    resp = requests.get(BASE_URL, headers=headers)
    resp.raise_for_status()

    soup = BeautifulSoup(resp.text, "html.parser")

    dramas = []

    for item in soup.find_all("li", class_="ipc-metadata-list-summary-item")[:12]:
        title_tag = item.find("h3", class_="ipc-title__text")
        rating_tag = item.find("span", class_="ipc-rating-star--rating")
        img_tag = item.find("img", class_="ipc-image")
        year_tag = item.find("span", class_="sc-15ac7568-7 cCsint dli-title-metadata-item")

        title = None
        rank = None
        if title_tag:
            raw_text = title_tag.get_text(strip=True) 
            parts = raw_text.split(". ", 1) 
            if len(parts) == 2:
                rank, title = int(parts[0]), parts[1]

        drama = {
            "title": title,
            "year": year_tag.get_text(strip=True),
            "image": img_tag["src"],
            "rating": rating_tag.get_text(strip=True),
            "rank": rank,
            "genres": ["placeholder", "placeholder", "placeholder"]
        }
        dramas.append(drama)

    with open("dramas.json", "w", encoding="utf-8") as f:
        json.dump(dramas, f, ensure_ascii=False, indent=2)
    
    return dramas

if __name__ == "__main__":
    results = scrape_imdb_chinese_dramas()
    print("Scraped", len(results), "dramas. Saved to dramas.json")