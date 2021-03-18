const { json } = require('body-parser');
const express = require('express');
const tracks = express.Router();
const pool = require("./connection");

tracks.get("/", (req, res) => {

    
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

tracks.post("/", (req, res) => {
  let product = req.body.product;
  let price = req.body.price;
  let quantity= req.body.quantity;
  console.log('req:',req.body);
pool
.query(
  `
INSERT INTO 
    shopping_cart(product, price, quantity) 
    VALUES ($1, $2, $3) returning *
`,
  [
    artist,
    name,
    Image
  ]
)
.then((results) => {
  res.status(201); // created
  res.json(results.rows); // return the item we created
});
   
   
});

// accept PUT request at URI:  
tracks.put("/:id", (req, res) => {
  const idInp = (req.params.id);
  console.log("id:",idInp);
  
  let product = req.body.product;
  let price = req.body.price;
  let quantity= req.body.quantity;
  console.log('req:',req.body);
  //const newItem = req.body;
  //console.log('newItem:',newItem);
  pool
.query(
  `
update 
    shopping_cart set product = $1, price = $2, quantity = $3 
    where id = $4 returning *
    
`,
  [
    product,
    price,
    quantity,
    idInp
  ] 
)
.then((results) => {
  res.status(201); // created
  res.json(results.rows); // return the item we created
});
//console.log("PUT Results:",newItem);
  //removes 1 item from the array, starting at the index provided,
  // then adds newItem in its place
  //itemsList.splice(index,1,newItem);
  // res.json(itemsList);
  //res.status(200).send('PUT Successful');
  //res.json(itemsList);
});

// accept DELETE request at URI: /items
items.delete("/:id", (req, res) => {
  console.log("hello");
  const idDel = (req.params.id);
  console.log("id:",idDel);
  //find the item to update from itemsList array
  /*const index = itemsList.findIndex( (i)=> { return i.id === idDel});
  console.log("index:",index);
  itemsList.splice(index, 1);
  res.status(204);
  res.json("Delete Successful..");*/
  pool
  .query(
    `
  delete from 
      shopping_cart where id = $1
`,
    [
      idDel
    ] 
  )
  .then((results) => {
    res.status(201); // created
    res.json(results); // return the item we created
  });


});


//export module so it can be used in other files
module.exports = tracks;