const express = require('express');
const router = express.Router();
const User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get("/current", async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  console.log(req.user._id);
  res.send(user);
});

module.exports = router;
