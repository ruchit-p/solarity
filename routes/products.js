var express = require("express");
var router = express.Router();

function adminonly(req, res, next) {
  if (!req.session.isadmin) {
    return res.redirect("/customer/login");
  }
  next();
}

/* Products Route CRUD */

// ==================================================
// Route to list all records. Display view to list all records
// ==================================================
router.get("/", adminonly, function (req, res, next) {
  let query =
    "SELECT product_id, productname, supplier_id, category_id, prodprice, status, quantity, homepage FROM product";
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render("error");
    } else {
      let query2 =
        "SELECT category_id, categoryname FROM category";
      db.query(query2, (err, result2) => {
        if (err) {
          console.log(err);
          res.render("error");
        } else {
          let query3 =
            "SELECT supplier_id, suppliername FROM supplier";
          db.query(query3, (err, result3) => {
            if (err) {
              console.log(err);
              res.render("error");
            } else {
              res.render("product/allrecords", {
                allrecs: result,
                category: result2,
                supplier: result3,
              });
            }
          })
        }
      })
    }
  });
});
// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get("/:recordid/show", adminonly, function (req, res, next) {
  console.log("here");
  let query =
    "SELECT product_id, productname, prodimage, description, category_id, supplier_id, wattage, cell_efficiency, weight, dimensions, prodprice, status, quantity, homepage FROM product WHERE product_id = " +
    req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render("error");
    } else {
      console.log("here");
      console.log(result); // show in console
      res.render("product/onerec", { onerec: result[0] });
    }
  });
});

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get("/addrecord", adminonly, function (req, res, next) {
  let query = "SELECT category_id, categoryname FROM category";
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render("error");
    }
    res.render("product/addrec", { category: result });
  });
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post("/", adminonly, function (req, res, next) {
  let insertquery =
    "INSERT INTO product (productname, prodimage, description, category_id, supplier_id, dimensions, wattage, cell_efficiency, weight, power_tolerance, prodprice, status, quantity, homepage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    insertquery,
    [
      req.body.productname,
      req.body.prodimage,
      req.body.description,
      req.body.category_id,
      req.body.supplier_id,
      req.body.dimensions,
      req.body.wattage,
      req.body.cell_efficiency,
      req.body.weight,
      req.body.power_tolerance,
      req.body.prodprice,
      req.body.status,
      req.body.quantity,
      req.body.homepage,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.render("error");
      } else {
        res.redirect("/product");
      }
    }
  );
});

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get("/:recordid/edit", adminonly, function (req, res, next) {
  let query =
    "SELECT product_id, productname, prodimage, description, category_id, supplier_id, dimensions, wattage, cell_efficiency, weight, power_tolerance, prodprice, status, quantity, homepage FROM product WHERE product_id = " +
    req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render("error");
    } else {
      let query = "SELECT category_id, categoryname FROM category";
      // execute query
      db.query(query, (err, catss) => {
        if (err) {
          console.log(err);
          res.render("error");
        }
        res.render("product/editrec", { onerec: result[0], category: catss });
      });
    }
  });
});

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post("/save", adminonly, function (req, res, next) {
  let updatequery =
    "UPDATE product SET productname = ?, prodimage = ?, description = ?, category_id = ?, supplier_id = ?, dimensions = ?, wattage = ?, cell_efficiency = ?, weight = ?, power_tolerance = ?, prodprice = ?, status = ?, quantity = ?, homepage = ? WHERE product_id = " +
    req.body.product_id;

  var hmpage = 0;
  if (req.body.homepage) {
    hmpage = 1;
  }

  db.query(
    updatequery,
    [
      req.body.productname,
      req.body.prodimage,
      req.body.description,
      req.body.category_id,
      req.body.supplier_id,
      req.body.dimensions,
      req.body.wattage,
      req.body.cell_efficiency,
      req.body.weight,
      req.body.power_tolerance,
      req.body.prodprice,
      req.body.status,
      req.body.quantity,
      hmpage,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.render("error");
      } else {
        res.redirect("/product");
      }
    }
  );
});

// ==================================================
// Route to delete one specific record.
// ==================================================
router.get("/:recordid/delete", adminonly, function (req, res, next) {
  let query = "DELETE FROM product WHERE product_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render("error");
    } else {
      res.redirect("/product");
    }
  });
});

module.exports = router;
