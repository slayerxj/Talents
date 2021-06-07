const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const uuid = require("uuid");

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

const fileObjs = fs.readdirSync(__dirname + "/public", { withFileTypes: true });
fileObjs.forEach(({ name }) => {
  if (path.extname(name) === ".html") {
    app.get("/" + path.basename(name, ".html"), (_req, res) => {
      res.sendFile(`${__dirname}/public/${name}`);
    });
  }
});

const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

let db;
(async () => {
  db = await open({
    filename: "./db/talents.db",
    driver: sqlite3.cached.Database,
  });
})();

app.get("/api/companies", async (_req, res) => {
  let sql = `SELECT * FROM companies`;
  res.send(await db.all(sql));
});

app.get("/api/persons", async (_req, res) => {
  let sql = `SELECT * FROM persons`;
  res.send(await db.all(sql));
});

app.post("/api/persons", bodyParser.json(), async (req, res) => {
  const data = req.body;
  data.uuid = uuid.v4();
  data.lastModified = new Date().getTime();
  const columns = Object.keys(data).join();
  const values = Object.values(data)
    .map((value) => `'${value}'`)
    .join();
  let sql = `INSERT INTO persons (${columns}) VALUES (${values})`;
  const a = async () => {
    await db.all(sql);
    return { id: data.uuid };
  };
  res.send(await a());
});

app.get("/api/person", async (req, res) => {
  if (req.query.id) {
    var sql = `SELECT * FROM persons WHERE uuid='` + req.query.id + "'";
  } else if (req.query.name) {
    var sql = `SELECT * FROM persons WHERE firstName='${req.query.name}'`;
  }
  res.send(await db.all(sql));
});

app.get("/api/company", async (req, res) => {
  let sql = `SELECT * FROM companies WHERE uuid='` + req.query.id + "'";
  res.send(await db.all(sql));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
