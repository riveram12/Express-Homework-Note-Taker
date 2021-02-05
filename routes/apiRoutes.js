const fs = require("fs");
var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));


module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
       
        res.json(data);

    });

    app.get("/api/notes/:id", function(req, res) {

        res.json(data[Number(req.params.id)]);

    });