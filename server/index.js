const express = require("express");
const { createUser } = require("./users");
var fetch = require('node-fetch');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json())

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/api/albums/:id/photos", async (req, res) => {
  const response = await fetch(`http://127.0.0.1:3004/albums/${req.params.id}/photos?_page=${req.query.page || 0}`);
  const data = await response.json();
  const { status, ok, statusText: message } = response;
  res.json({
    data,
    last: Math.ceil(response.headers.get('x-total-count') / 10),
    total: response.headers.get('x-total-count'),
    status,
    ok,
    message
  });
});

app.post("/api/users", async (req, res) => {
  const response = await createUser(req);
  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
