const express = require("express");
const cors = require("cors");

require("dotenv").config();
require("./db/mongoose");

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res, next) => {
  res.send("BABILI BLOG API");
});

app.listen(port, () => {
  console.log("Server started on port " + port);
});
