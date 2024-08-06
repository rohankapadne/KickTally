const express = require("express");
const { getTeamStats } = require("../controllers/statsController");
const router = express.Router();

router.post("/stats", getTeamStats);

module.exports = router;
