export interface Team {
    player: string;
    team: string;
    domesticLeaguePoints: number;
    domesticLeaguePlayed: number;
    domesticLeagueWins: number;
    domesticLeagueDraws: number;
    domesticLeagueLosses: number;
    domesticCupPoints: number;
    domesticCupPlayed: number;
    domesticCupWins: number;
    domesticCupDraws: number;
    domesticCupLosses: number;
    championsLeaguePoints: number;
    championsLeaguePlayed: number;
    championsLeagueWins: number;
    championsLeagueDraws: number;
    championsLeagueLosses: number;
    totalPlayed: number;
    totalWins: number;
    totalDraws: number;
    totalLosses: number;
    totalPoints: number;
    normalisedPoints: number;
  }