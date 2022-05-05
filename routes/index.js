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

    let query1 =
      "SELECT promotion_id, promotitle, promoimage FROM promotion WHERE startdate <= CURRENT_DATE() and enddate >= CURRENT_DATE()";
    // execute query1
    db.query(query1, (err, results2) => {
      if (err) {
        console.log(err);
        res.render("error");
      }
      res.render("index", { allrecs: result, promos: results2, title: "Solarity" });
    });
  });
});
module.exports = router;
