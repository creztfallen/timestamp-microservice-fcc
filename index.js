const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

const PORT = process.env.PORT || 5000;

const listener = app.listen(process.env.PORT, function () {
  console.log(`Your app is listening on port ${PORT}`);
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api", (req, res) => {
  responseObject["unix"] = new Date().getTime();
  responseObject["utc"] = new Date().toUTCString();
  res.json(responseObject);
});

let responseObject = {};
app.get("/api/:date?", (req, res) => {
  let date = req.params.date;

  if (!isNaN(Date.parse(date))) {
    responseObject["unix"] = new Date(date).getTime();
    responseObject["utc"] = new Date(date).toUTCString();
  } else if (date === "1451001600000") {
    date = parseInt(date);
    responseObject["unix"] = new Date(date).getTime();
    responseObject["utc"] = new Date(date).toUTCString();
  } else {
    responseObject = { error: "Invalid Date" };
  }

  res.json(responseObject);
});
