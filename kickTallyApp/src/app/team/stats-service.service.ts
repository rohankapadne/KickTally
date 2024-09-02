import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StatsServiceService {

  private apiUrl = 'https://v3.football.api-sports.io/teams/statistics';
  private headers = new HttpHeaders({
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': 'fc91cd9fc170e9a97a1eb62ed1f614f5'
  });

  constructor(private http: HttpClient) {}
  
  getTeamStatistics(season: string, teamId: number, leagueId: number): Observable<any> {
    const params = {
      season: season,
      team: teamId.toString(),
      league: leagueId.toString()
    };
    return this.http.get(this.apiUrl, { headers: this.headers, params: params });
  }
}
