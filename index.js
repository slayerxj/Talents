const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.get('/content', (req, res) => {
  const sqlite3 = require('sqlite3').verbose();

  // open a database connection
  let db = new sqlite3.Database('./db/sample.db', (err) => {
    if (err) {
      console.error(err.message);
    }
  });

  let sql = `SELECT name FROM langs`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows);
  });

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})