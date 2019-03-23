"use strict";

// Basic express setup:

const PORT = 8080;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Use Mongo DB as database;

const MongoClient = require("mongodb").MongoClient;
const mongoUrl = "mongodb://localhost:27017/tweeter";

MongoClient.connect(mongoUrl, async function(err, db) {
  if (err) {
    console.error(`Failed to connect: ${mongoUrl}`);
    throw err;
  }
  console.log(`Connected to mongodb: ${mongoUrl}`);
  // sending Mongo DB to DataHelpers factory function;
  const DataHelpers = require("./lib/data-helpers.js")(db);
  // and then helper functions are exported over to tweetsRoutes;
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  app.use("/tweets", tweetsRoutes);

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });
});
