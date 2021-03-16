const { Nuxt, Builder } = require("nuxt");
const mongoose = require("mongoose");
const express = require("express");
// const morgan = require("morgan");
const app = express();
const dotenv = require("dotenv").config();

// MONGODB_CONNECTION
const dbSrv = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_CLUSTER}?retryWrites=true&w=majority`;
// console.log(dbSrv)
const srvOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  dbName: process.env.DB_NAME
};

mongoose
  .connect(dbSrv, srvOptions)
  .then(() =>
    console.log("Connected to mongoDB Atlas cluster on " + srvOptions.dbName)
  )
  .catch(error => console.log(error));

const config = require("../nuxt.config");
config.dev = !(process.env.NODE_ENV === "production");

const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;

// ALLOW BODY PARSING
app.use(express.json());

// Debugging
// app.use(morgan("dev"));

// IMPORT ROUTES
const karmaRouter = require("./Routers/KarmaRouter");

//  USE ROUTES
app.use("/api/karma", karmaRouter);

// NUXT MAGIC
const nuxt = new Nuxt(config);

if (config.dev) {
  const builder = new Builder(nuxt);
  builder.build();
}

app.use(nuxt.render);

app.listen(port, host);
console.log("Server is listening on " + host + ":" + port);
