const express = require("express");
const router = express.Router();

const ApiCtrl = require("./geopi/index");

router.get("", ApiCtrl.getMeta);

module.exports = router;
