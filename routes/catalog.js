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

// ==================================================
// Route to remove an item from the cart
// ==================================================
router.post("/remove", function (req, res, next) {
  // Find the element index of the product_id that needs to be removed
  var n = req.session.cart.indexOf(req.body.product_id);
  // Remove element from cart and quantity arrays
  req.session.cart.splice(n, 1);
  req.session.qty.splice(n, 1);
  res.redirect("/catalog/cart");
});

// ==================================================
// Route to show shopping cart
// ==================================================
router.get("/cart", function (req, res, next) {
  if (!Array.isArray(req.session.cart) || !req.session.cart.length) {
    res.render("cart", { cartitems: 0 });
  } else {
    let query =
      "SELECT product_id, productname, prodimage, supplier_id, category_id, dimensions, prodprice, status FROM product WHERE product_id IN (" +
      req.session.cart +
      ") order by find_in_set(product_id, '" +
      req.session.cart +
      "');";
    // execute query
    db.query(query, (err, result) => {
      if (err) {
        res.render("error");
      } else {
        res.render("cart", { cartitems: result, qtys: req.session.qty });
      }
    });
  }
});

module.exports = router;
