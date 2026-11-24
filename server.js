// load packages and secrets from .env
const express = require("express");

const { MongoClient } = require("mongodb");
require("dotenv").config();

console.log(
  process.env.MONGO_URI ? "MONGO_URI loaded ✅" : "MONGO_URI missing ❌",
);
