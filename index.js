const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const auth = require("./auth/middleware-auth");
const bodyParser = require("body-parser");
//routes
const accountRouter = require("./routes/accounts-router");
const mock = require("./model/data");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(auth);


app.use("/accounts", accountRouter);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).send(error);
});
const port = process.env.PORT || 3200;

app.listen(port);
