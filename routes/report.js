var express = require("express");
var router = express.Router();

function adminonly(req, res, next) {
  if (!req.session.isadmin) {
    return res.redirect("/customer/login");
  }
  next();
}

/* GET report page. */
router.get("/", adminonly, function (req, res, next) {
  res.render("report/reportmenu");
});

router.get("/cust", adminonly, function (req, res, next) {
  let query =
    "SELECT customer_id, firstname, lastname, email, address1, city, state, zip, username FROM customer";
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render("error");
    }
    res.render("report/custlist", { allrecs: result });
  });
});

router.get("/prod", adminonly, function (req, res, next) {
  let query =
    "SELECT product_id, productname, supplier_id, category_id, prodprice, status, quantity, homepage FROM product";
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render("error");
    }
    res.render("report/prodlist", { allrecs: result });
  });
});

router.get("/sale", adminonly, function (req, res, next) {
  let query =
    "SELECT order_id, customer_id, saledate, customernotes, paymentstatus, authorizationnum FROM saleorder";
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render("error");
    }
    res.render("report/salelist", { allrecs: result });
  });
});

module.exports = router;
