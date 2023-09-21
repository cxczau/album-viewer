var http = require('http');
const express = require("express");
const fetch_album = require("./albums");
var fetch = require('node-fetch');

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/api/albums/:id/photos", async (req, res) => {
  const response = await fetch(`http://127.0.0.1:3004/albums/${req.params.id}/photos?_page=${req.query.page || 0}`);
  const data = await response.json();
  res.json({ data, last: Math.ceil(response.headers.get('x-total-count') / 10), total: response.headers.get('x-total-count') });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
