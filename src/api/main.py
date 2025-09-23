from fastapi import FastAPI, HTTPException
import json
import os
from dotenv import load_dotenv
from .spotify import get_spotify_url
from pymongo import MongoClient
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
load_dotenv()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
        "http://127.0.0.1:5173",],  # or ["*"] for all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


client = MongoClient("mongodb://localhost:27017/")
db = client["local"]
dramas_collection = db["bookmarked_dramas"]

dramas_collection.insert_one({
    "title": "The Untamed"
})

class Drama(BaseModel):
    title: str
    year: str
    image: str
    rating: str
    rank: int
    genres: list[str]

@app.post("/bookmark")
async def bookmark_drama(drama: Drama):
    drama_dict = drama.model_dump()
    res = dramas_collection.insert_one(drama_dict)
    return {"inserted_id": str(res.inserted_id)}

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

@app.delete("/drama/{drama_title}")
async def delete_drama(drama_title: str):
    print(f"Trying to delete: '{drama_title}'")
    result = dramas_collection.delete_one({"title": drama_title})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Drama not found.")