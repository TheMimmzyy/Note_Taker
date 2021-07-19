const db = require("../db/db.json");
const fs = require("fs");
var path = require("path");

module.exports = function (app) {
  let objectsList = JSON.parse(fs.readFileSync("./db/db.json", "utf8", (err) => {
    if (err) throw err;
  }));

  app.get("/api/notes", function (req, res) {
    return res.json(objectsList)
  })

  app.post("/api/notes", function (req, res) {
    let newNote = { title: req.body.title, text: req.body.text };
    newNote.id = objectsList.length.toString();

    objectsList.push(newNote);

    fs.writeFile("./db/db.json", JSON.stringify(objectsList), (err) => {
      if (err) throw err;
    });
    res.json(objectsList);
  });

  // API DELETE Requests  
  app.delete("/api/notes/:id", function (req, res) {
    let idSelected = JSON.parse(req.params.id);
    objectsList = objectsList.filter((e) => {
      return e.id != idSelected;
    });
    objectsList.forEach((val, index) => {
      val.id = index.toString();
    });

    fs.writeFile("./db/db.json", JSON.stringify(objectsList), (err) => {
      if (err) throw err;
    });
    res.end();
  });
};