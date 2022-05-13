var express = require("express");
var router = express.Router();
// ==================================================
// Route to list all products on the catalog
// ==================================================

router.get("/", function (req, res, next) {
  let query =
    "SELECT product_id, productname, prodimage, category_id, supplier_id, prodprice, status FROM product";
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      res.redirect("/");
    }
    res.render("catalog", { allrecs: result });
  });
});

// ==================================================
// Route to add an item to the cart
// ==================================================
router.post("/add", function (req, res, next) {
  if (typeof req.session.cart !== "undefined" && req.session.cart) {
    if (req.session.cart.includes(req.body.product_id)) {
      // Item Exists in Basket - Increase Quantity
      var n = req.session.cart.indexOf(req.body.product_id);
      req.session.qty[n] =
        parseInt(req.session.qty[n]) + parseInt(req.body.qty);
    } else {
      // Item Being Added First Time
      req.session.cart.push(req.body.product_id);
      req.session.qty.push(req.body.qty);
    }
  } else {
    var cart = [];
    cart.push(req.body.product_id);
    req.session.cart = cart;
    var qty = [];
    qty.push(req.body.qty);
    req.session.qty = qty;
  }
  res.redirect("/catalog/cart");
});

module.exports = router;
