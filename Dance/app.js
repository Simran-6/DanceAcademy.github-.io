const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
// const bodyparser = require("body-parser");
mongoose.connect("mongodb://0.0.0.0:27017/contactDance", {
  useNewUrlParser: true,
});
const port = 80;

// Define Mongoose Schema
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  email: String,
  description: String,
});

Contact = mongoose.model("Contact", contactSchema);

// Serve Static file
app.use("/static", express.static("static"));
app.use(express.urlencoded());

// Set the template engine as pug
app.set("view engine", "pug");
// set the view directory // read from which directory
app.set("views", path.join(__dirname, "views"));

// End points
// for serving index pug file use this
// app.get('/',(req,res)=>{
//     const params = {}
//     res.status(200).render('index.pug', params);
// })

// for serving home pug file use this
app.get("/", (req, res) => {
  const params = {};
  res.status(200).render("home.pug", params);
});

// for contact file
app.get("/contact", (req, res) => {
  const params = {};
  res.status(200).render("contact.pug", params);
});

app.post("/contact", (req, res) => {
  var myData = new Contact(req.body);
  myData
    .save()
    .then(() => {
      res.send("This item has been saved to the database");
    })
    .catch(() => {
      res.status(400).send("Item was not saved to the database");
    });
});

// Start the Server
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});
