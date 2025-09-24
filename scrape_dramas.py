import requests
from bs4 import BeautifulSoup
import re
import json
import cloudscraper


BASE_URL="https://mydramalist.com/shows/top_chinese_dramas"

def scrape_mdl_dramas():
    headers = {
            "User-Agent": (
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/140.0.0.0 Safari/537.36"
        ),
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": "https://mydramalist.com/",
        "Connection": "keep-alive",
    }

    scraper = cloudscraper.create_scraper() 
    resp = scraper.get(BASE_URL)
    resp.raise_for_status()

    soup = BeautifulSoup(resp.text, "html.parser")
    
    dramas = []
    for item in soup.find_all("div", class_="box"):
        if len(dramas) >= 12: 
            break
        title_tag = item.find("h6", class_="title")
        if not title_tag:  
            continue
        rating_tag = item.find("span", class_="score")
        img_tag = item.find("img", class_="img-responsive")
        rank_div = item.find("div", class_="ranking")
        rank_tag = rank_div.find("span").text.strip() if rank_div and rank_div.find("span") else None
        rank = int(rank_tag.lstrip("#")) if rank_tag else None
        info_tag = item.find("span", class_="text-muted")
        info = info_tag.text.strip() if info_tag else ""
        match = re.search(r"(\d{4}),\s*(\d+)", info)
        
        year = None
        episodes = None
        image = None

        if img_tag:
            image = img_tag.get("src") or img_tag.get("data-src") or img_tag.get("data-original")
        if match:
            year = match.group(1)      
            episodes = match.group(2)  

        drama = {
            "title": title_tag.text.strip() if title_tag else None,
            "year": year,
            "image": image,
            "rating": rating_tag.text.strip() if rating_tag else None,
            "rank": rank,
            "genres": ["genre1", "genre2", "genre3"],
            "episodes": episodes
        }

        dramas.append(drama)
    
    with open("dramas.json", "w", encoding="utf-8") as f:
        json.dump(dramas, f, ensure_ascii=False, indent=2)

    return dramas

if __name__ =="__main__":
    results = scrape_mdl_dramas()
    print("Scraped", len(results), "dramas. Saved to dramas.json")

