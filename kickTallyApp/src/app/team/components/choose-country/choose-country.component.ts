import { Component, OnInit } from '@angular/core';
import { StatsServiceService } from '../../stats-service.service';
import { Team } from '../../team.model';

@Component({
  selector: 'app-choose-country',
  templateUrl: './choose-country.component.html',
  styleUrls: ['./choose-country.component.scss']
})
export class ChooseCountryComponent implements OnInit {

  teams: Team[] = [];
  lastFetchedTime: string | null = null; // Timestamp for last data fetch
  season = "2024";
  cooldownPeriod = 60000; // 1 minute cooldown period (60,000 ms)
  isLoading = false; // Flag to control loader visibility
  toastMessage: string | null = null;

  manCity = {
    teamName: "Manchester City",
    domesticLeague: 39,
    domesticCup: 45,
    championsLeague: 2,
    teamId: 50,
    logo: "https://media.api-sports.io/football/teams/50.png"
  };

  realMadrid = {
    teamName: "Real Madrid",
    domesticLeague: 140,
    domesticCup: 143,
    championsLeague: 2,
    teamId: 541,
    logo: "https://media.api-sports.io/football/teams/541.png"
  };

  bayernMunich = {
    teamName: "Bayern Munich",
    domesticLeague: 78,
    domesticCup: 81,
    championsLeague: 2,
    teamId: 157,
    logo: "https://media.api-sports.io/football/teams/157.png"
  };

  constructor(private _statsService: StatsServiceService) { }

  ngOnInit(): void {
    this.initializeTeams();
  }

  initializeTeams(): void {
    this.teams = [
      {
        player: "RSK",
        team: this.manCity.logo,
        domesticLeaguePoints: 0,
        domesticLeaguePlayed: 0,
        domesticLeagueWins: 0,
        domesticLeagueDraws: 0,
        domesticLeagueLosses: 0,
        domesticCupPoints: 0,
        domesticCupPlayed: 0,
        domesticCupWins: 0,
        domesticCupDraws: 0,
        domesticCupLosses: 0,
        championsLeaguePoints: 0,
        championsLeaguePlayed: 0,
        championsLeagueWins: 0,
        championsLeagueDraws: 0,
        championsLeagueLosses: 0,
        totalPlayed: 0,
        totalWins: 0,
        totalDraws: 0,
        totalLosses: 0,
        totalPoints: 0,
        normalisedPoints: 0
      },
      {
        player: "Rahul & Rutu",
        team: this.realMadrid.logo,
        domesticLeaguePoints: 0,
        domesticLeaguePlayed: 0,
        domesticLeagueWins: 0,
        domesticLeagueDraws: 0,
        domesticLeagueLosses: 0,
        domesticCupPoints: 0,
        domesticCupPlayed: 0,
        domesticCupWins: 0,
        domesticCupDraws: 0,
        domesticCupLosses: 0,
        championsLeaguePoints: 0,
        championsLeaguePlayed: 0,
        championsLeagueWins: 0,
        championsLeagueDraws: 0,
        championsLeagueLosses: 0,
        totalPlayed: 0,
        totalWins: 0,
        totalDraws: 0,
        totalLosses: 0,
        totalPoints: 0,
        normalisedPoints: 0
      },
      {
        player: "Avinash",
        team: this.bayernMunich.logo,
        domesticLeaguePoints: 0,
        domesticLeaguePlayed: 0,
        domesticLeagueWins: 0,
        domesticLeagueDraws: 0,
        domesticLeagueLosses: 0,
        domesticCupPoints: 0,
        domesticCupPlayed: 0,
        domesticCupWins: 0,
        domesticCupDraws: 0,
        domesticCupLosses: 0,
        championsLeaguePoints: 0,
        championsLeaguePlayed: 0,
        championsLeagueWins: 0,
        championsLeagueDraws: 0,
        championsLeagueLosses: 0,
        totalPlayed: 0,
        totalWins: 0,
        totalDraws: 0,
        totalLosses: 0,
        totalPoints: 0,
        normalisedPoints: 0
      }
    ];
  }

  async loadTeamData() {
    this.isLoading = true;
    this.toastMessage = null;
    try {
      await this.fetchAllTeamStatisticsSequentially();
      this.lastFetchedTime = new Date().toLocaleString(); // Update the timestamp
      this.toastMessage = 'Data loaded successfully!';
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('Daily request limit reached')) {
          this.toastMessage = 'Daily request limit reached. Please try again tomorrow.';
        } else if (error.message.includes('Rate limit hit')) {
          this.toastMessage = 'Rate limit exceeded. Please wait and try again later.';
        } else {
          this.toastMessage = 'Error occurred while fetching data!';
        }
      } else {
        // Handle unexpected error types
        this.toastMessage = 'An unexpected error occurred!';
      }
    } finally {
      this.isLoading = false;
    }
  }
  

  async fetchAllTeamStatisticsSequentially() {
    try {
      await this.fetchTeamStatisticsSequentially(this.manCity, 0);
      await this.fetchTeamStatisticsSequentially(this.realMadrid, 1);
      await this.fetchTeamStatisticsSequentially(this.bayernMunich, 2);
    } catch (error) {
      console.error('Error occurred during fetching team statistics:', error);
      throw error; // Ensure errors are rethrown to be caught in loadTeamData
    }
    this.sortTeamsByNormalizedPoints();
    console.log("Teams ", this.teams);
  }

  sortTeamsByNormalizedPoints() {
    this.teams.sort((a, b) => b.normalisedPoints - a.normalisedPoints);
  }

  async fetchTeamStatisticsSequentially(team: any, index: number): Promise<void> {
    try {
      await this.fetchStatisticsWithRateLimitCheck(this.season, team.teamId, team.domesticLeague, index, 'domesticLeague');
      await this.fetchStatisticsWithRateLimitCheck(this.season, team.teamId, team.domesticCup, index, 'domesticCup');
      await this.fetchStatisticsWithRateLimitCheck(this.season, team.teamId, team.championsLeague, index, 'championsLeague');
    } catch (error) {
      throw error; // Rethrow the error to terminate the operation
    }
  }

  async fetchStatisticsWithRateLimitCheck(season: string, teamId: number, leagueId: number, index: number, leagueType: string): Promise<void> {
    try {
      const response = await this._statsService.getTeamStatistics(season, teamId, leagueId).toPromise();

      // Check if the response contains errors
      if (response.errors && response.errors.length > 0) {
        if (response.errors.rateLimit) {
          console.warn('Rate limit hit, waiting for cooldown period...');
          this.toastMessage = 'Rate limit exceeded. Please wait and try again later.';
          await this.delay(this.cooldownPeriod); // Wait for the cooldown period
          await this.fetchStatisticsWithRateLimitCheck(season, teamId, leagueId, index, leagueType); // Retry the request
        } else if (response.errors.requests) {
          console.error('Daily request limit reached:', response.errors.requests);
          throw new Error('Daily request limit reached');
        } else {
          console.error('API Error:', response.errors);
          throw new Error('API error occurred');
        }
      } else {
        this.handleApiResponse(response.response, index, leagueType);
      }
    } catch (error: any) {
      console.error('Error fetching team statistics:', error);
      throw error; // Terminate the operation on other errors
    }
  }

  handleApiResponse(response: any, index: number, leagueType: string): void {
    try {
      if (!response || !response.fixtures) {
        throw new Error('Invalid response data');
      }

      if (leagueType === 'domesticLeague') {
        this.teams[index].domesticLeaguePoints = ((response.fixtures.wins.total * 3) + response.fixtures.draws.total);
        this.teams[index].domesticLeaguePlayed = response.fixtures.played.total;
        this.teams[index].domesticLeagueWins = response.fixtures.wins.total;
        this.teams[index].domesticLeagueDraws = response.fixtures.draws.total;
        this.teams[index].domesticLeagueLosses = response.fixtures.loses.total;
      } else if (leagueType === 'domesticCup') {
        this.teams[index].domesticCupPoints = ((response.fixtures.wins.total * 3) + response.fixtures.draws.total);
        this.teams[index].domesticCupPlayed = response.fixtures.played.total;
        this.teams[index].domesticCupWins = response.fixtures.wins.total;
        this.teams[index].domesticCupDraws = response.fixtures.draws.total;
        this.teams[index].domesticCupLosses = response.fixtures.loses.total;
      } else if (leagueType === 'championsLeague') {
        this.teams[index].championsLeaguePoints = ((response.fixtures.wins.total * 3) + response.fixtures.draws.total);
        this.teams[index].championsLeaguePlayed = response.fixtures.played.total;
        this.teams[index].championsLeagueWins = response.fixtures.wins.total;
        this.teams[index].championsLeagueDraws = response.fixtures.draws.total;
        this.teams[index].championsLeagueLosses = response.fixtures.loses.total;
      }

      // Update total values
      this.updateTotalStatistics(index);
    } catch (error) {
      console.error('Error handling API response:', error);
      throw error; // Need to handle response errors gracefully later
    }
  }

  updateTotalStatistics(index: number): void {
    const team = this.teams[index];
    team.totalPlayed = team.domesticLeaguePlayed + team.domesticCupPlayed + team.championsLeaguePlayed;
    team.totalWins = team.domesticLeagueWins + team.domesticCupWins + team.championsLeagueWins;
    team.totalDraws = team.domesticLeagueDraws + team.domesticCupDraws + team.championsLeagueDraws;
    team.totalLosses = team.domesticLeagueLosses + team.domesticCupLosses + team.championsLeagueLosses;
    team.totalPoints = team.domesticLeaguePoints + team.domesticCupPoints + team.championsLeaguePoints;
    team.normalisedPoints = this.calculateNormalisedPoints(team.championsLeaguePoints, team.championsLeaguePlayed, team.domesticLeaguePoints, team.domesticLeaguePlayed, team.domesticCupPoints, team.domesticCupPlayed);
  }

  calculateNormalisedPoints(championsLeaguePoints: number, championsLeaguePlayed: number, domesticLeaguePoints: number, domesticLeaguePlayed: number, domesticCupPoints: number, domesticCupPlayed: number): number {
    // Logic to calculate normalised points based on league weightage
    // Handle cases where matches played is zero to avoid division by zero
    const championsLeagueRatio = championsLeaguePlayed > 0 ? (championsLeaguePoints / championsLeaguePlayed) : 0;
    const domesticLeagueRatio = domesticLeaguePlayed > 0 ? (domesticLeaguePoints / domesticLeaguePlayed) : 0;
    const domesticCupRatio = domesticCupPlayed > 0 ? (domesticCupPoints / domesticCupPlayed) : 0;
    return ((championsLeagueRatio * 3) + (domesticLeagueRatio * 2) + domesticCupRatio);
  }

  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
