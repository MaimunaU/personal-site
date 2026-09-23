import json, random, os
from flask import Flask, render_template, jsonify

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')

songs_file_path = os.path.join(DATA_DIR, 'songs.json')
try:
    with open(songs_file_path, 'r', encoding='utf-8') as f:
        ALL_SONGS = json.load(f)
except FileNotFoundError:
    ALL_SONGS = []

# This route serves your homepage
@app.route('/')
def home():
    return render_template('index.html')

# Add extra routes for your other pages as needed:
@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/interests')
def interests():
    return render_template('interests.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')

# Load your curated songs json once when server starts
# with open('data/songs.json', 'r', encoding='utf-8') as f:
#     ALL_SONGS = json.load(f)

# @app.route('/api/gacha/<vibe>')
# def pull_gacha(vibe):
#     # Filter songs by the selected vibe tag
#     if vibe == 'liked':
#         filtered_songs = ALL_SONGS
#     else:
#         filtered_songs = [s for s in ALL_SONGS if vibe in s.get('vibes', [])]
    
#     if not filtered_songs:
#         return jsonify({"error": "No songs found for this vibe!"}), 404
        
#     chosen_song = random.choice(filtered_songs)
#     return jsonify(chosen_song)

# Load your songs json once when the server starts

@app.route('/api/gacha')
def pull_gacha():
    if not ALL_SONGS:
        return jsonify({"error": "No songs found!"}), 404
        
    # Pick a random song from your entire library
    chosen_song = random.choice(ALL_SONGS)
    return jsonify(chosen_song)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
