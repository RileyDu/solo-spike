const express = require("express");
const router = express.Router();
const axios = require('axios');
const GIPHY_API_KEY = process.env.GIPHY_API_KEY;

router.get("/", (req, res) => {
  axios
    .get(
      `http://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}`
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

module.exports = router;
