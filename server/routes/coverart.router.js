const express = require("express");
const router = express.Router();
const axios = require('axios');
const LAST_FM_API_KEY = process.env.LAST_FM_API_KEY;

router.get("/", (req, res) => {
  axios
    .get(
      `http://ws.audioscrobbler.com/2.0/?api_key=${LAST_FM_API_KEY}&format=json&method=album.getinfo&artist=${album.artist}&album=${album.title}`
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

module.exports = router;
