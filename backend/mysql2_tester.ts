const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "travel_cards",
});

connection.execute(
  "SELECT * FROM `countries`",
  function (err: any, results: any, fields: any) {
    console.log(results[0]);
    console.log(fields);
  }
);
