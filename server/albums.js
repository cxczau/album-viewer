var http = require('http');

function fetch_album(id, page = 0) {
  http.get('http://jsonplaceholder.typicode.com/albums/${id}/photos?page=${page}', (resp) => {
    let rawData = '';
    console.log(resp)
    // resp.on('data', (chunk) => { rawData += chunk; });
  
    resp.on('end', () => {
      // res.json(JSON.parse(rawData));
      return JSON.parse(rawData);
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}
module.exports = fetch_album;