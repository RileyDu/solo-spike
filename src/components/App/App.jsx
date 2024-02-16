import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [randomGif, setRandomGif] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGifs = () => {
    axios
      .get("/api/random/")
      .then((response) => {
        setRandomGif(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((err) => {
        console.error("Error getting gifs", err);
        setLoading(false);
      });
  };

const reloadGif = () => {
  axios
  .get("/api/random/")
  .then((response) => {
    setRandomGif(response.data);
    setLoading(false);
    console.log(response.data);
  })
  .catch((err) => {
    console.error("Error getting gifs", err);
    setLoading(false);
  });
}

  useEffect(() => {
    fetchGifs();
  }, []);

  return (
    <div>
      <header className="App-header">
        <h1>Random Giphy API</h1>
      </header>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <img src={randomGif.data && randomGif.data.images.original.url} alt="Random Gif" />
      )}
      <button onClick={reloadGif}>RANDOMIZE GIF</button>
    </div>
  );
}

export default App;
