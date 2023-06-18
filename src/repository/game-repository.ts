import { PlayerStats } from '../interfaces/player-stats';
import { DeathCauses } from '../interfaces/death-causes';
import { GameStats } from '../interfaces/game-stats';

export class GameRepository {
  private gameCounter = 0;
  private gameStats: GameStats = {};

  public incrementGameCounter(): void {
    this.gameCounter += 1;
  }

  public getGameCounter(): number {
    return this.gameCounter;
  }

  public getPlayerStats(): PlayerStats {
    return this.gameStats[`game_${this.gameCounter}`];
  }

  public getGameStats(): GameStats {
    return this.gameStats;
  }

  public initNewGame(): void {
    this.incrementGameCounter();
    this.gameStats[`game_${this.gameCounter}`] = this.initializePlayerStats();
  }

  private initializePlayerStats(): PlayerStats {
    return {
      total_kills: 0,
      players: [],
      playerNames: {} as Record<string, string>,
      kills: {} as Record<string, number>,
      kills_by_means: {} as Record<DeathCauses, number>,
    };
  }
}
