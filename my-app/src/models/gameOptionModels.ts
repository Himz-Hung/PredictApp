interface GameOptionResponse {
  awayTeamAbbr: string;
  homeTeamAbbr: string;
  gameName: string;
}
interface GameOption {
  label: string;
  value: string;
  date: string;
}
export type { GameOptionResponse, GameOption };
