const axiosInstance = require("./axiosInstance");

const getLeagueStats = async (teamId, leagueId, season) => {
  const response = await axiosInstance.get("/teams/statistics", {
    params: {
      team: teamId,
      league: leagueId,
      season: season,
    },
  });
  return response;
};

//This Method makes 3 calls per team that makes IT 12 calls per minute, it should only make less than 10
//Also it can be optimized using Promise.all()

exports.getTeamStats = async (teams, season) => {
  const results = [];
  for (const team of teams) {
    const teamStats = {};
    teamStats.team_id = team.team_id;
    teamStats.stats = {};
    for (const leagueId of team.leagues) {
      const response = await getLeagueStats(team.team_id, leagueId, season);
      teamStats.stats[leagueId] = response.data;
    }
    console.log(teamStats);
    results.push(teamStats);
  }
  return results;
};
