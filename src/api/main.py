from fastapi import FastAPI
import json
import os
from dotenv import load_dotenv
from spotify import get_spotify_url


load_dotenv()

app = FastAPI()

@app.get("/dramas")
def get_dramas():
    if not os.path.exists("dramas.json"):
        return {"error": "No dramas.json found. Run scraper first."}
    with open("dramas.json", "r", encoding="utf-8") as f:
        return json.load(f)

@app.get("/spotify")
def spotify(song: str):
    CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
    CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")

    url = get_spotify_url(song, CLIENT_ID, CLIENT_SECRET)
    return {"url": url}
