/**
 * @author Tuukka Tuominen
 * @version 1.0.0
 */

require("dotenv").config();

const connection = require("./database/crudrepository.js");

const express = require("express");

const cors = require("cors");

const app = express();

const port = process.env.PORT || 8080;
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

app.delete("/words/:id", (req, res) => {
  const id = req.params.id;
  connection.deleteById(id, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/words", (req, res) => {
  let words = req.body;

  connection.save(words, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/words", (req, res) => {
  let english_word = req.body.english_word;
  let finnish_word = req.body.finnish_word;
  let id = req.body.id;
  connection.update([english_word, finnish_word, id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
