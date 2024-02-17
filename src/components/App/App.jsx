import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";

function App() {
 const [coverArt, setCoverArt] = useState('')
 const [artist, setArtist] = useState('')
 const [album, setAlbum] = useState('')



function getCoverArt(event){
  event.preventDefault();
  const albumTitle = document.getElementById("albumTitle").value
  const albumArtist = document.getElementById("albumArtist").value
console.log('albumTitle:', albumTitle);
console.log('albumArtist', albumArtist);

axios
.get("/api/coverart", { params: { albumTitle: albumTitle, albumArtist:albumArtist } })
.then((response) => {
  console.log(response.data);
  setCoverArt(response.data.album.image[4]['#text']);
  setAlbum(response.data.album.name)
  setArtist(response.data.album.artist)
  document.getElementById("albumArtist").value = '';
  document.getElementById("albumTitle").value = '';
})
.catch((error) => {
  console.error("Error during last.fm search", error);
});
}

  return (
    <div>
      <header className="App-header">
        <h1>Riley's Spike: Last.fm api</h1>
      </header>
      <main>
      <h2>Get Album Cover Art</h2>
    <form>
      <input type="text" placeholder="Album Artist" id="albumArtist" />
      <input type="text" placeholder="Album Title" id="albumTitle" />
      <button onClick={(event) => getCoverArt(event)}>SUBMIT ARTIST</button>
      <h2>⬇️ COVER ART FOR SUBMITTED ALBUM ⬇️</h2>
      {coverArt ? (
        <>
      <img id="coverArt" src={coverArt} alt="" />
      <p> <strong>Artist:</strong> {artist}</p>
      <p> <strong>Album:</strong> {album}</p>
      </>
      ) : (
        <h3>Waiting for Cover Art Request</h3>
      )}
    </form>
    </main>
    </div>
  );
}

export default App;
