from fastapi import FastAPI
from spotify import get_spotify_url

app = FastAPI()

@app.get("/spotify")
def spotify(song: str):
    CLIENT_ID = ""
    CLIENT_SECRET

    url = get_spotify_url(song, CLIENT_ID, CLIENT_SECRET)
    return {"url": url}
