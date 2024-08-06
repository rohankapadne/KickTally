const { getTeamStats } = require("../services/apiFootballService");

exports.getTeamStats = async (req, res) => {
  try {
    const teams = req.body;
    const stats = await getTeamStats(teams, 2023);
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
