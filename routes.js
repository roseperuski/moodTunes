const { json } = require('body-parser');
const express = require('express');
const tracks = express.Router();
const pool = require("./connection");

tracks.get("/", (req, res) => {

    console.log('entering get tracks routes');
    pool.query("SELECT * FROM playlist")
    .then((results) => { // do this when we get the result
    // make the DB data match the front end format
   let rtnTracks = results.rows;
   
  if (!rtnTracks){
    res.status(404).send('Empty search list!!');
  }
  else{
    res.status(200).json(rtnTracks);
  }
  
});
});

// accept POST request at URI: /items

// tracks.post("/", (req, res) => {
//      let artist = req.body.artist;
//      let name = req.body.name;
//      let artistUrl= req.body.urlArtist;
//      let detailUrl = req.body.urlDetail;
//      console.log('req:',req.body);
// pool
// .query(
//   `
// INSERT INTO 
//   playlist (artist_name, track_name, artist_url,track_url) 
//     VALUES ($1, $2, $3,$4) returning *
// `,
//   [
//     artist,
//     name,
//     artistUrl,
//     detailURl
//   ]
// )
// .then((results) => {
//   res.status(201); // created
//   res.json(results.rows); // return the item we created
// });
   
   
// });


// // accept DELETE request at URI: /items
// items.delete("/:id", (req, res) => {
//   console.log("hello");
//   const idDel = (req.params.id);
//   console.log("id:",idDel);
 
//   pool
//   .query(
//     `
//   delete from 
//       playlist where id = $1
// `,
//     [
//       idDel
//     ] 
//   )
//   .then((results) => {
//     res.status(201); // created
//     res.json(results); // return the item we created
//   });


// });


//export module so it can be used in other files
module.exports = tracks;