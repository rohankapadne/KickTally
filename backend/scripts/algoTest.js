const extractUsefulData = (currentResponse) => {
  return currentResponse.map((teamData) => {
    const { stats, ...rest } = teamData;

    const updatedStats = {};
    for (const key in stats) {
      if (stats[key]) {
        updatedStats[key] = { ...stats[key].response };
      }
    }

    return { ...rest, stats: updatedStats };
  });
};

const convertDataToPointsTable = (jsonData) => {
  const pointsTable = [];
  return pointsTable;
};

const computeTeamPointsFromResponse = (teamData) => {
  const pointsRow = {};
  return pointsRow;
};

const seasonData = require("../mockdata/season2023.json");

// console.log(seasonData[0]);

const filteredData = extractUsefulData(seasonData);
console.log(filteredData[0]);
