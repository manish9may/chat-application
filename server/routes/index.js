const express = require("express");
const registerUser = require("../controllers/registerUser");
const checkEmail = require("../controllers/checkEmail");
const checkPassword = require("../controllers/checkPassword");
const userDetails = require("../controllers/userDetails");
const searchUser = require("../controllers/searchUser");
const updateUserDetails = require("../controllers/updateUserDetails");
const logout = require("../controllers/logout");
const router = express.Router();

router.post("/register", registerUser);

router.post("/email", checkEmail);

router.post("/password", checkPassword);

router.get("/user-details", userDetails);

router.post("/search-user", searchUser);

router.post("/update-user", updateUserDetails);

router.get("/logout", logout);

module.exports = router;
