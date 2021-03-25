const { json } = require("body-parser");
const express = require("express");
const tracks = express.Router();
const pool = require("./connection");

tracks.get("/", (req, res) => {
  console.log("entering get tracks routes");
  pool.query("SELECT * FROM playlist").then((results) => {
    // do this when we get the result
    // make the DB data match the front end format
    let rtnTracks = results.rows;

    if (!rtnTracks) {
      res.status(404).send("Empty search list!!");
    } else {
      res.status(200).json(rtnTracks);
    }
  });
});

// accept POST request at URI: /items

tracks.post("/", (req, res) => {
  let newTrack = req.body;
  // let artist = req.body.artist;
  // let name = req.body.name;
  // let artistUrl = req.body.urlArtist;
  // let trackUrl = req.body.urlTrack;
  
  console.log("req:", newTrack);
  
  pool.query('INSERT INTO playlist (artist_name, track_name, artist_url, track_url) VALUES ($1, $2, $3, $4) returning *;',
  [newTrack.artist_name, newTrack.track_name, newTrack.artist_url, newTrack.track_url
  ]).then((results) => {
      res.status(201); // created
      res.json(results.rows); // return the item we created
  });
});


tracks.delete("/:id", (req, res) => {
  console.log("hello");
  const idDel = (req.params.id);
  console.log("id:",idDel);
  pool.query('DELETE FROM playlist WHERE id = $1',[idDel])
  .then((results) => {
    res.status(204); // successfully deleted
    res.json(results); // return the tracks without item we deleted
  });

});

//export module so it can be used in other files
module.exports = tracks;
