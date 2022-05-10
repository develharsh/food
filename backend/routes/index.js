const express = require("express");
const router = express.Router();
//const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");

// @Base Url
router.use((req, res, next) => {
  req["currentUrl"] = `${req.protocol + "://" + req.headers.host}`;
  next();
});

// @User
const User = require("./user-route");
router.use("/user", User);

module.exports = router;
