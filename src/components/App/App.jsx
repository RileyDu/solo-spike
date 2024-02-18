import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [responseCoverArt, setResponseCoverArt] = useState("");
  const [responseArtist, setResponseArtist] = useState("");
  const [responseAlbum, setResponseAlbum] = useState("");
// used for setting last.fm response

  const [albumTitle, setAlbumTitle] = useState("");
  const [albumArtist, setAlbumArtist] = useState("");
  // using local state to set the album and artists form data

  function getCoverArt(event) {
    event.preventDefault();
    // take the form values and submit to last.fm
    axios
      .get("/api/coverart", {
        params: { albumTitle: albumTitle, albumArtist: albumArtist }, // the params last.fm needs to get back the cover art
      })
      .then((response) => {
        setResponseCoverArt(response.data.album.image[4]["#text"]);
        setResponseAlbum(response.data.album.name); // last.fm's reponse is used here to get some auto capilization
        setResponseArtist(response.data.album.artist); // last.fm's reponse is used here to get some auto capilization
        setAlbumArtist("");
        setAlbumTitle(""); // reset the form
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
        <form onSubmit={(event) => getCoverArt(event)}>
          <input
            type="text"
            placeholder="Album Artist"
            id="albumArtist"
            onChange={(e) => setAlbumArtist(e.target.value)}
            value={albumArtist}
          />
          <input
            type="text"
            placeholder="Album Title"
            id="albumTitle"
            onChange={(e) => setAlbumTitle(e.target.value)}
            value={albumTitle}
          />
          <button type="submit">SUBMIT ARTIST</button>
        </form>
        <h2>⬇️ COVER ART FOR SUBMITTED ALBUM ⬇️</h2>
        {responseCoverArt ? (
          <>
            <img id="coverArt" src={responseCoverArt} alt={responseAlbum}/>
            <p>
              {" "}
              <strong>Artist:</strong> {responseArtist}
            </p>
            <p>
              {" "}
              <strong>Album:</strong> {responseAlbum}
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
