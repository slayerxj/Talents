const express = require('express');
const bodyParser = require('body-parser')
const query = require('./src/query');
const app = express();
const port = 3000;

const uuid = require('uuid');

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

app.get('/company', (req, res) => {
  res.sendFile(__dirname + '/public/company.html')
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

app.post('/api/persons', bodyParser.json(), async (req, res) => {
  const data = req.body;
  data.uuid = uuid.v4();
  const columns = Object.keys(data).join();
  const values = Object.values(data).map((value) => `'${value}'`).join();
  let sql = `INSERT INTO persons (${columns}) VALUES (${values})`;
  res.send(await db.all(sql));
})

app.get('/api/person', async (req, res) => {
  let sql = `SELECT * FROM persons WHERE uuid='` + req.query.id + "'";
  res.send(await db.all(sql));
})

app.get('/api/company', async (req, res) => {
  let sql = `SELECT * FROM companies WHERE uuid='` + req.query.id + "'";
  res.send(await db.all(sql));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})