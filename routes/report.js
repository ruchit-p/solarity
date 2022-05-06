var express = require("express");
var router = express.Router();


/* GET report page. */
router.get("/", function (req, res, next) {
  res.render("report/reportmenu");
});

router.get("/cust", function (req, res, next) {
  res.render("report/custlist");
});

router.get("/prod", function (req, res, next) {
  res.render("report/prodlist");
});

router.get("/sale", function (req, res, next) {
  res.render("report/salelist");
});

module.exports = router;
