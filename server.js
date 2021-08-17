const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(require("./routes"));

app.listen(PORT, () => {
    console.log(`Utilizing port ${PORT}.`)
})