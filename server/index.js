"use strict";

// Basic express setup:

const PORT = 8080;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const MongoClient = require("mongodb").MongoClient;
const mongoUrl = "mongodb://localhost:27017/tweeter";

MongoClient.connect(mongoUrl, function(err, db) {
  if (err) {
    console.error(`Failed to connect: ${mongoUrl}`);
    throw err;
  }
  console.log(`Connected to mongodb: ${mongoUrl}`);

  const DataHelpers = require("./lib/data-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  app.use("/tweets", tweetsRoutes);

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });
});
