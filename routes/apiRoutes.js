const fs = require("fs");
var data = JSON.parse(fs.readFileSync("../db/db.json", "utf8"));

// create a new route
module.exports = function (app) {
  // view all notes
  app.get("/api/notes", (req, res) => {
    res.json(data);
  });
  // notes unique id
  app.get("/api/notes/:id", (req, res) => {
    res.json(data[Number(req.params.id)]);
  });

  // to post a new note
  app.post("/api/notes", (req, res) => {
    //giving a unqiue id to new note
    let newNote = req.body;
    let uniqueId = data.length.toString();
    console.log(uniqueId);
    newNote.id = uniqueId;
    data.push(newNote);

    //write to the db.json file
    fs.writeFileSync("../db/db.json", JSON.stringify(data), function (err) {
      if (err) throw err;
    });
    //returning result data as json
    res.json(data);
  });

  // to delete a note
  app.delete("/api/notes/:id", function (req, res) {
    //deleting unqiue id assigned to deleted note
    let noteId = req.params.id;
    let newId = 0;
    console.log(`Deleting note with id ${noteId}`);
    data = data.filter((currentNote) => {
      return currentNote.id != noteId;
    });
    for (currentNote of data) {
      currentNote.id = newId.toString();
      newId++;
    }
    fs.writeFileSync("../db/db.json", JSON.stringify(data));
    res.json(data);
  });
};
