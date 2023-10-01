const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 8000;
const mongoose = require("mongoose");
var cons = require("consolidate");
const hostname = "127.0.0.1";

// --------------------------------
// MongoDB connection
// --------------------------------

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(
    "mongodb://127.0.0.1:27017/venkatesh-portfolio-database"
  );
}

// --------------------------------
//Schema
// --------------------------------

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

//model
const user = mongoose.model("venkatesh-portfolio-database", contactSchema);

// --------------------------------
// EXPRESS SPECIFIC STUFF
// --------------------------------

app.use("/static", express.static("static")); // For serving static files
app.use(express.urlencoded());

// --------------------------------
// view engine setup
// --------------------------------
app.engine("html", cons.swig);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

// --------------------------------
// Get data
// --------------------------------

app.get("/", (req, res) => {
  res.status(200).render("index.html");
});

app.get("/contact-me.html", (req, res) => {
  res.status(200).render("contact-me.html");
});

// --------------------------------
// post data
// --------------------------------

app.post("/contact", async (req, res) => {
  const data = new user({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  });
  await data.save();

  res.status(200).render("index");
});

// --------------------------------
// START THE SERVER
// --------------------------------

app.listen(port, hostname, () => {
  console.log(
    `The application started successfully at http://${hostname}:${port}/`
  );
});
