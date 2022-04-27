var express = require("express");
var router = express.Router();

/* Saleorders Route CRUD */

// ==================================================
// Route to list all records. Display view to list all records
// ==================================================
router.get("/", function (req, res, next) {
  let query =
    "SELECT order_id, customer_id, saledate, customernotes, paymentstatus, authorizationnum FROM saleorder";
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render("error");
    }
    res.render("saleorder/allrecords", { allrecs: result });
  });
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get("/:recordid/show", function (req, res, next) {
  let query =
    "SELECT order_id, customer_id, saledate, customernotes, paymentstatus, authorizationnum FROM saleorder WHERE order_id = " +
    req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render("error");
    } else {
      res.render("saleorder/onerec", { onerec: result[0] });
    }
  });
});

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get("/addrecord", function (req, res, next) {
  res.render("saleorder/addrec");
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post("/", function (req, res, next) {
  let insertquery =
    "INSERT INTO saleorder (customer_id, saledate, customernotes, paymentstatus, authorizationnum) VALUES (?, ?, ?, ?, ?)";
  db.query(
    insertquery,
    [
      req.body.customer_id,
      req.body.saledate,
      req.body.customernotes,
      req.body.paymentstatus,
      req.body.authorizationnum,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.render("error");
      } else {
        res.redirect("/saleorder");
      }
    }
  );
});

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get("/:recordid/edit", function (req, res, next) {
  let query =
    "SELECT order_id, customer_id, saledate, customernotes, paymentstatus, authorizationnum FROM saleorder WHERE order_id = " +
    req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render("error");
    } else {
      res.render("saleorder/editrec", { onerec: result[0] });
    }
  });
});

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post("/save", function (req, res, next) {
  let updatequery =
    "UPDATE saleorder SET customer_id = ?, saledate = ?, customernotes = ?, paymentstatus = ?, authorizationnum = ? WHERE order_id = " + req.body.order_id;
  db.query(
    updatequery,
    [
      req.body.customer_id,
      req.body.saledate,
      req.body.customernotes,
      req.body.paymentstatus,
      req.body.authorizationnum,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.render("error", {message:err.message ,error: err });
      } else {
        res.redirect("/saleorder");
      }
    }
  );
});

// ==================================================
// Route to delete one specific record.
// ==================================================
router.get("/:recordid/delete", function (req, res, next) {
  let query = "DELETE FROM saleorder WHERE saleorder_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render("error");
    } else {
      res.redirect("/saleorder");
    }
  });
});

module.exports = router;
