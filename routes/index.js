var express = require("express");
var router = express.Router();
const { films } = require("./films");
const app = express();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
