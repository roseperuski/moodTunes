// be sure to run
// npm install cors,
// npm install express, and
// npm install express-http-proxy

const express = require("express");
const proxy = require("express-http-proxy");

const app = express();
// const port = process.env.PORT || 8080;
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

//const url = "https://musicovery.com/api/V6";
// app.use(
//   "/",
//   proxy(url, {
//     userResHeaderDecorator: () => ({ "Access-Control-Allow-Origin": "*" }),
//   })
// );

app.use(express.json());

const routes = require("./routes");
app.use("/api", routes);

app.use(express.static(__dirname + "/public"));
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

const secret = process.env.SECRET;
const url = "https://api.discogs.com";
app.use(
  "/proxy",
  proxy(url, {
    proxyReqOptDecorator: (proxyReqOpts) => {
      proxyReqOpts.headers["Authorization"] =
        "Discogs key=pXLfosMaWGQQMMRYSLGv, secret=" + secret;
      return proxyReqOpts;
    },
  })
);