const fs = require("fs");
var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

// create a new route 
module.exports = function(app) {
    // view all notes 
    app.get("/api/notes", function(req, res) {
       
        res.json(data);

    });
    // get notes unique id 
    app.get("/api/notes/:id", function(req, res) {

        res.json(data[Number(req.params.id)]);

    });

    // to post a new note 

    app.post("/api/notes", function(req, res) {

        let newNote = req.body;
        let uniqueId = (data.length).toString();
        console.log(uniqueId);
        newNote.id = uniqueId;
        data.push(newNote);
        
        fs.writeFileSync("./db/db.json", JSON.stringify(data), function(err) {
            if (err) throw (err);        
        }); 

        res.json(data);    

    });