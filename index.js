require("dotenv").config();

const connection = require("./database/crudrepository.js");

const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

connection.connect();

app.use(cors());

app.use(express.static("frontend/build"));

app.get("/words", (req, res) => {
  connection.findAll((err, words) => {
    if (err) {
      res.send(err);
    } else {
      res.send(words);
    }
  });
});
