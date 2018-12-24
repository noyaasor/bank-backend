const express = require("express");
const router = express.Router();
const data = require("../model/data");

router.use((req, res, next) => {
  console.log("middle accounts");
  next();
});
router.get("/", (req, res, next) => {
  res.json(data);
});

router.get("/:id", (req, res, next) => {
  let result;
  try {
    result = data.find(account => {
      return account.id == req.params.id;
    });
    if (result) {
      res.json(result);
    } else {
      res.status(404).send("account id does not exist");
    }
  } catch (ex) {
    throw new Error("account was not found");
  }
});

router.post("/", (req, res, next) => {
  try {
    
    data.push(req.body);
    res.json({ message: `account ${req.body.accountId} added`, result: true });
  } catch (ex) {
    res.status(500).json({ message: ex, result: false });
  }
});

module.exports = router;
