import requests # python lib for making HTTP requests (GET, POST, etc)
import base64 # encode client ID and secret in base64 --- authentication purposes

def get_spotify_token(client_id: str, client_secret: str) -> str:
    # Authenticare with Spotify API using client credentials and return an access token
    auth_str = f"{client_id}:{client_secret}" # f-string: turns quote into a formatted string literal
    b64_auth = base64.b64encode(auth_str.encode()).decode() # converts to Base64 encoded format

    resp = requests.post(
       "https://accounts.spotify.com/api/token",
       data={"grant_type": "client_credentials"},
       headers={"Authorization": f"Basic {b64_auth}"}
    )

    resp.raise_for_status() #raise error if
    results = resp.json()["access_token"]

def get_spotify_url(song_name: str, client_id: str, client_secret: str) -> str:
    #Given a song name, return the Spotify embed link for the top matching track
    token = get_spotify_token(client_id, client_secret)

    #call spotify search api
    resp = requests.get(
        "https://api.spotify.com/v1/search",
        headers={"Authorization": f"Bearer {token}"},
        params={"q": song_name, "type": "track", "limit": 1}
    )
    resp.raise_for_status()
    results = resp.json()

    if not results["tracks"]["items"]:
        return None
    
    track_id = results["tracks"]["items"][0]["id"]
    embed_url = f"https://open.spotify.com/track/{track_id}"
    return embed_url

