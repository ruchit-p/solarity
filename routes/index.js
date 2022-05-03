var express = require("express");
var router = express.Router();
router.get("/", function (req, res, next) {
  let query =
    "SELECT product_id, productname, prodimage, category_id, supplier_id, prodprice, status, quantity FROM product WHERE homepage = true";
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render("error");
    }
    res.render("index", { allrecs: result, title: "Solarity" });
  });
});
module.exports = router;
