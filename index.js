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

app.get('/person', (req, res) => {
  res.sendFile(__dirname + '/public/person.html')
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
  res.send(await db.all(sql));
})

app.get('/api/persons', async (req, res) => {
  let sql = `SELECT * FROM persons`;
  res.send(await db.all(sql));
})

app.get('/api/person', async (req, res) => {
  let sql = `SELECT * FROM persons WHERE uuid='` + req.query.id + "'";
  res.send(await db.all(sql));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})