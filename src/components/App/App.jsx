import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [coverArt, setCoverArt] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  // using local state to set the cover art, album and artists, data is from the last.fm response 

  function getCoverArt(event) {
    event.preventDefault();
    const albumTitle = document.getElementById("albumTitle").value; 
    const albumArtist = document.getElementById("albumArtist").value; // take the form values and submit to last.fm
    axios
      .get("/api/coverart", {
        params: { albumTitle: albumTitle, albumArtist: albumArtist }, // the params last.fm needs to get back the cover art
      })
      .then((response) => {
        setCoverArt(response.data.album.image[4]["#text"]);
        setAlbum(response.data.album.name); // last.fm's reponse is used here to get some auto capilization
        setArtist(response.data.album.artist); // last.fm's reponse is used here to get some auto capilization
        document.getElementById("albumArtist").value = "";
        document.getElementById("albumTitle").value = ""; // reset the form
      })
      .catch((error) => {
        console.error("Error during last.fm search", error);
      });
  }

  return (
    <div>
      <header className="App-header">
        <h1>Riley's Spike: 'last.fm api'</h1>
      </header>
      <main>
        <h2>Fetch Album Cover Art</h2>
        <form>
          <input type="text" placeholder="Album Artist" id="albumArtist" />
          <input type="text" placeholder="Album Title" id="albumTitle" />
          <button onClick={(event) => getCoverArt(event)}>SUBMIT ARTIST</button>
        </form>
        <h2>⬇️ COVER ART FOR SUBMITTED ALBUM ⬇️</h2>
        {coverArt ? (
          <>
            <img id="coverArt" src={coverArt} alt="" />
            <p>
              {" "}
              <strong>Artist:</strong> {artist}
            </p>
            <p>
              {" "}
              <strong>Album:</strong> {album}
            </p>
          </>
        ) : (
          <h3>Waiting for Cover Art Request</h3>
        )}
        {/* conditionally rendering to not have a bad image load before user commits a search */}
      </main>
    </div>
  );
}

export default App;
