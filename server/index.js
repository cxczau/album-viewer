var http = require('http');
const express = require("express");
const fetch_album = require("./albums");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/api/albums/:id", (req, res) => {
  // fetch_album(req.params.id, req.query.page)
  //   .then((data) => res.json(data))

  http.get('http://[::1]:3004/albums/1/photos?page=0', (resp) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
  
    resp.on('end', () => {
      res.json(JSON.parse(rawData));
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
