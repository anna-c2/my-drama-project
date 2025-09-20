from fastapi import FastAPI
from api.spotify_api import app as spotify_app

app = FastAPI()

app.mount("/api", spotify_app)