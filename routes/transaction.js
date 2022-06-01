var express = require("express");
var router = express.Router();

/* Tranactions Route CRUD */

function adminonly(req, res, next) {
  if (!req.session.isadmin) {
    return res.redirect("/customer/login");
  }
  next();
}

// ==================================================
// Route to list all records. Display view to list all records
// ==================================================
router.get("/", adminonly, function (req, res, next) {
  let query =
    "SELECT transaction_id, order_id, product_id, saleprice, qty FROM transaction";
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render("error");
    }
    res.render("transaction/allrecords", { allrecs: result });
  });
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get("/:recordid/show", adminonly, function (req, res, next) {
  let query =
    "SELECT transaction_id, order_id, product_id, saleprice, qty FROM transaction WHERE transaction_id = " +
    req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render("error");
    } else {
      res.render("transaction/onerec", { onerec: result[0] });
    }
  });
});

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get("/addrecord", adminonly, function (req, res, next) {
  res.render("transaction/addrec");
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post("/", adminonly, function (req, res, next) {
  let insertquery =
    "INSERT INTO transaction (order_id, product_id, saleprice, qty) VALUES (?, ?, ?, ?)";
  db.query(
    insertquery,
    [req.body.order_id, req.body.product_id, req.body.saleprice, req.body.qty],
    (err, result) => {
      if (err) {
        console.log(err);
        res.render("error");
      } else {
        res.redirect("/transaction");
      }
    }
  );
});

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get("/:recordid/edit", adminonly, function (req, res, next) {
  let query =
    "SELECT transaction_id, order_id, product_id, saleprice, qty FROM transaction WHERE transaction_id = " +
    req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render("error");
    } else {
      res.render("transaction/editrec", { onerec: result[0] });
    }
  });
});

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post("/save", adminonly, function (req, res, next) {
  let updatequery =
    "UPDATE transaction SET order_id = ?, product_id = ?, saleprice = ?, qty = ? WHERE transaction_id = " +
    req.body.transaction_id;
  db.query(
    updatequery,
    [req.body.order_id, req.body.product_id, req.body.saleprice, req.body.qty],
    (err, result) => {
      if (err) {
        console.log(err);
        res.render("error", { message: err.message, error: err });
      } else {
        res.redirect("/transaction");
      }
    }
  );
});

// ==================================================
// Route to delete one specific record.
// ==================================================
router.get("/:recordid/delete", adminonly, function (req, res, next) {
  let query =
    "DELETE FROM transaction WHERE transaction_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render("error");
    } else {
      res.redirect("/transaction");
    }
  });
});

module.exports = router;
