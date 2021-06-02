const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("./db/talents.db");

let sql = `INSERT INTO companies(name, phone) VALUES ('Microsoft', '002')`;

db.run(sql, function (err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`Rows inserted ${this.changes}`);
});

db.close();
