// load packages and secrets from .env
const express = require("express");

const { MongoClient } = require("mongodb");
require("dotenv").config();

// Create the Express app and choose a port
const app = express();

const port = 3001;

// Connect to MongoDB Atlas using the secret URI from .env
// this builds a "client," the messenger that carries requests to Atlas.
// You hand it the address from .env. new means "make a fresh one from the MongoClient blueprint."
const client = new MongoClient(process.env.MONGO_URI);

async function connectToDatabase() {
  try {
    // this actually dials Atlas. await means "pause right here until Atlas answers
    await client.connect();
    console.log("Connected to MongoDB Atlas ✅");
  } catch (error) {
    console.error("Failed to connect to MongoDB ❌", error.message);
  }
}
// defining a function doesn't run it, and this line actually runs it.
connectToDatabase();

// GET / checks the database connection and reports back
app.get("/", async (req, res) => {
  try {
    await client.db("admin").command({ ping: 1 });
    res.json({ message: "Successfully connected to the database!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to connect to the database." });
  }
});
