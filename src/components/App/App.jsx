import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";

function App() {
 const [coverArt, setCoverArt] = useState('')


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
    <form>
      <hr/>
      <input type="text" placeholder="Album Title" id="albumTitle" />
      <input type="text" placeholder="Album Artist" id="albumArtist" />
      <button onClick={(event) => getCoverArt(event)}>SUBMIT ARTIST</button>
      <hr/>
      <h2>COVER ART FOR SUBMITTED ALBUM</h2>
      <img src={coverArt} alt="" />
    </form>
    </div>
  );
}

export default App;

// Get Store up and running
// Insert the form values to backend
// POST the response from Last.Fm to store