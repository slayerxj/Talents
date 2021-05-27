const express = require('express');
const query = require('./src/query');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.get('/companies', (req, res) => {
  res.sendFile(__dirname + '/public/companies.html')
})

app.get('/persons', (req, res) => {
  res.sendFile(__dirname + '/public/persons.html')
})

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html')
// })

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html')
// })

const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

let db;
(async () => {
  db = await open({
    filename: './db/talents.db',
    driver: sqlite3.cached.Database
  })
})();

app.get('/api/companies', async (req, res) => {
  let sql = `SELECT * FROM companies`;
  const a = await db.all(sql);
  res.send(a);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})