const router = require("express").Router();
const ctrl = require("../db/controllers");

router.route("/scores")
  .get(ctrl.get)
  .post(ctrl.post);

module.exports = router