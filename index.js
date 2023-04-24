import express from "express";

import bodyParser from "body-parser";
import mysql from "mysql";
const PORT = 8080;

const connection = mysql.createConnection({
  host: "192.168.0.160",
  user: "root",
  password: "1111",
  database: "server_side",
  port: "3306",
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/barcode", (req, res) => {
  console.log(req.query);
  try {
    connection.query(
      `SELECT * FROM products WHERE bar_code = ${req.query.code}`,
      (error, results) => {
        if (error) {
          throw new Error(error);
        } else {
          res.header({ "Content-Type": "application/json" });
          if (results[0]) {
            res.send(JSON.stringify({ data: results[0] }, null, " "));
          } else {
            res.send(JSON.stringify({ error: "not found" }, null, " "));
          }
        }
      }
    );
  } catch (e) {
    res.header({ "Content-Type": "application/json" });
    res.send({ message: "not found" });
  }
});
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}......`);
});
