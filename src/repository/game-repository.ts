import { PlayerStats } from '../interfaces/player-stats';
import { DeathCauses } from '../interfaces/death-causes';
import { GameStats } from '../interfaces/game-stats';

export class GameRepository {
  private gameCounter = 0;
  private gameStats: GameStats = {};

  public incrementGameCounter(): void {
    this.gameCounter += 1;
  }

  public incrementPoints(id: string): void {
    const name = this.getPlayerName(id);
    this.getPlayerStats().kills[name] += 1;
  }

  public reducePoints(id: string): void {
    const name = this.getPlayerName(id);
    this.getPlayerStats().kills[name] -= 1;
  }

  public incrementTotalKills(): void {
    this.getPlayerStats().total_kills += 1;
  }

  private getDeathCauses(deathCause: string): DeathCauses {
    return DeathCauses[parseInt(deathCause)] as unknown as DeathCauses;
  }

  public incrementKillsByMean(deathCauseId: string): void {
    const deathCause = this.getDeathCauses(deathCauseId);
    this.initDeathCause(deathCause);
    this.getPlayerStats().kills_by_means[deathCause] += 1;
  }

  private initDeathCause(deathCause: DeathCauses): void {
    if (!this.getPlayerStats().kills_by_means[deathCause]) {
      this.getPlayerStats().kills_by_means[deathCause] = 0;
    }
  }

  public getPlayerName(id: string): string {
    return this.getPlayerStats().playerNames[id];
  }

  public doesPlayerNotExist(id: string): boolean {
    return !this.getPlayerStats().playerNames[id];
  }

  public addNewPlayer(id: string, name: string): void {
    this.getPlayerStats().players.push(name);
    this.getPlayerStats().playerNames[id] = name;
    this.getPlayerStats().kills[name] = 0;
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
