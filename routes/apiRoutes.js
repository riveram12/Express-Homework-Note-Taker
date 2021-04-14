const fs = require("fs")
const express = require("express")
const uniqid = require("uniqid")
const path = require("path")
const router = express.Router()

router.get("/api/notes", function(req, res) {
    fs.readFile(path.resolve(__dirname, "../Develop/db/db.json"), "utf8", function(err, data) {
        if (err) throw err
        res.json(JSON.parse(data))
    })
})
router.post("/api/notes", function(req, res) {
    var body = req.body
    console.log("body", body)
    fs.readFile(path.resolve(__dirname, "../Develop/db/db.json"), "utf8", function(err, data) {
        if (err) throw err
        const currentNotes = JSON.parse(data)
        currentNotes.push(Object.assign({ id: uniqid() }, body))
        fs.writeFile(path.resolve(__dirname, "../Develop/db/db.json"), JSON.stringify(currentNotes), function(error) {
            if (error) throw error
            res.sendStatus(201)
        })

    })

});
router.delete("/api/notes/:id", function(req, res) {
    fs.readFile(path.resolve(__dirname, "../Develop/db/db.json"), "utf8", function(err, data) {
        if (err) throw err
        const currentNotes = JSON.parse(data)
        const newNotes = currentNotes.filter(function(note) { return note.id !== req.params.id; })
        fs.writeFile(path.resolve(__dirname, "../Develop/db/db.json"), JSON.stringify(newNotes), function(error) {
            if (error) throw error
            res.sendStatus(204)
        })
    })
})

module.exports = router