import { expect } from 'chai';
import { DeathCausesArray, GameStats, ParseLogController } from '../src/app';

describe('AppModule', () => {
  let app: ParseLogController;

  before(() => {
    app = new ParseLogController();
  });

  describe('when the module is started', () => {
    it('should be defined and ok', () => {
      expect(app).to.be.ok;
    });
  });

  describe('When process all file', () => {
    const inputFile = 'src/assets/qgames.log';
    let output: GameStats;

    before(async () => {
      output = await app.parseLogFile(inputFile);
    });

    it('should return expected value', async () => {
      expect(output).to.be.eql({
        game_1: {
          total_kills: 0,
          players: ['Isgalamido'],
          kills: {
            Isgalamido: 0,
          },
          kills_by_means: {},
        },
        game_2: {
          total_kills: 4,
          players: ['Dono da Bola', 'Mocinha', 'Isgalamido', 'Zeh'],
          kills: {
            'Dono da Bola': -1,
            Mocinha: 0,
            Isgalamido: 1,
            Zeh: -2,
          },
          kills_by_means: {
            MOD_ROCKET: 1,
            MOD_TRIGGER_HURT: 2,
            MOD_FALLING: 1,
          },
        },
        game_3: {
          total_kills: 105,
          players: ['Dono da Bola', 'Isgalamido', 'Zeh', 'Assasinu Credi'],
          kills: {
            'Dono da Bola': 13,
            Isgalamido: 19,
            Zeh: 20,
            'Assasinu Credi': 13,
          },
          kills_by_means: {
            MOD_TRIGGER_HURT: 9,
            MOD_FALLING: 11,
            MOD_ROCKET: 20,
            MOD_RAILGUN: 8,
            MOD_ROCKET_SPLASH: 51,
            MOD_MACHINEGUN: 4,
            MOD_SHOTGUN: 2,
          },
        },
        game_4: {
          total_kills: 14,
          players: ['Dono da Bola', 'Isgalamido', 'Zeh', 'Assasinu Credi'],
          kills: {
            'Dono da Bola': 0,
            Isgalamido: 2,
            Zeh: 1,
            'Assasinu Credi': 1,
          },
          kills_by_means: {
            MOD_ROCKET: 4,
            MOD_ROCKET_SPLASH: 4,
            MOD_TRIGGER_HURT: 5,
            MOD_RAILGUN: 1,
          },
        },
        game_5: {
          total_kills: 29,
          players: [
            'Fasano Agai',
            'Oootsimo',
            'Isgalamido',
            'Zeh',
            'Dono da Bola',
            'UnnamedPlayer',
            'Maluquinho',
            'Assasinu Credi',
            'Mal',
          ],
          kills: {
            'Fasano Agai': 0,
            Oootsimo: 8,
            Isgalamido: 3,
            Zeh: 7,
            'Dono da Bola': 2,
            UnnamedPlayer: 0,
            Maluquinho: 0,
            'Assasinu Credi': 1,
            Mal: 0,
          },
          kills_by_means: {
            MOD_ROCKET: 5,
            MOD_RAILGUN: 2,
            MOD_SHOTGUN: 4,
            MOD_ROCKET_SPLASH: 13,
            MOD_TRIGGER_HURT: 3,
            MOD_FALLING: 1,
            MOD_MACHINEGUN: 1,
          },
        },
        game_6: {
          total_kills: 130,
          players: [
            'Oootsimo',
            'Isgalamido',
            'Zeh',
            'Dono da Bola',
            'Mal',
            'Assasinu Credi',
            'Chessus!',
            'Chessus',
          ],
          kills: {
            Oootsimo: 20,
            Isgalamido: 16,
            Zeh: 9,
            'Dono da Bola': 12,
            Mal: -3,
            'Assasinu Credi': 22,
            'Chessus!': 0,
            Chessus: 0,
          },
          kills_by_means: {
            MOD_FALLING: 7,
            MOD_TRIGGER_HURT: 20,
            MOD_ROCKET_SPLASH: 49,
            MOD_ROCKET: 29,
            MOD_SHOTGUN: 7,
            MOD_RAILGUN: 9,
            MOD_MACHINEGUN: 9,
          },
        },
        game_7: {
          total_kills: 89,
          players: ['Oootsimo', 'Isgalamido', 'Zeh', 'Dono da Bola', 'Mal', 'Assasinu Credi'],
          kills: {
            Oootsimo: 16,
            Isgalamido: 20,
            Zeh: 12,
            'Dono da Bola': 3,
            Mal: -2,
            'Assasinu Credi': 10,
          },
          kills_by_means: {
            MOD_TRIGGER_HURT: 9,
            MOD_ROCKET: 18,
            MOD_ROCKET_SPLASH: 39,
            MOD_FALLING: 6,
            MOD_RAILGUN: 12,
            MOD_MACHINEGUN: 4,
            MOD_SHOTGUN: 1,
          },
        },
        game_8: {
          total_kills: 67,
          players: [
            'Oootsimo',
            'Isgalamido',
            'Zeh',
            'Dono da Bola',
            'Mal',
            'Assasinu Credi',
            'Chessus!',
            'Chessus',
          ],
          kills: {
            Oootsimo: 9,
            Isgalamido: 1,
            Zeh: 12,
            'Dono da Bola': 2,
            Mal: 3,
            'Assasinu Credi': 10,
            'Chessus!': 0,
            Chessus: 8,
          },
          kills_by_means: {
            MOD_TRIGGER_HURT: 8,
            MOD_ROCKET_SPLASH: 25,
            MOD_SHOTGUN: 1,
            MOD_ROCKET: 17,
            MOD_MACHINEGUN: 3,
            MOD_FALLING: 3,
            MOD_RAILGUN: 10,
          },
        },
        game_9: {
          total_kills: 60,
          players: [
            'Oootsimo',
            'Dono da Bola',
            'Zeh',
            'Chessus',
            'Mal',
            'Assasinu Credi',
            'Isgalamido',
          ],
          kills: {
            Oootsimo: -1,
            'Dono da Bola': 3,
            Zeh: 7,
            Chessus: 5,
            Mal: 1,
            'Assasinu Credi': 3,
            Isgalamido: 6,
          },
          kills_by_means: {
            MOD_TELEFRAG: 25,
            MOD_TRIGGER_HURT: 17,
            MOD_ROCKET: 4,
            MOD_ROCKET_SPLASH: 1,
            MOD_RAILGUN: 7,
            MOD_BFG_SPLASH: 2,
            MOD_BFG: 2,
            MOD_MACHINEGUN: 1,
            MOD_CRUSH: 1,
          },
        },
        game_10: {
          total_kills: 20,
          players: [
            'Dono da Bola',
            'Isgalamido',
            'Zeh',
            'Oootsimo',
            'Chessus',
            'Assasinu Credi',
            'UnnamedPlayer',
            'Mal',
          ],
          kills: {
            'Dono da Bola': -2,
            Isgalamido: 5,
            Zeh: 0,
            Oootsimo: 4,
            Chessus: 0,
            'Assasinu Credi': -3,
            UnnamedPlayer: 0,
            Mal: 0,
          },
          kills_by_means: {
            MOD_TRIGGER_HURT: 7,
            MOD_CRUSH: 1,
            MOD_ROCKET_SPLASH: 4,
            MOD_BFG_SPLASH: 3,
            MOD_MACHINEGUN: 1,
            MOD_RAILGUN: 4,
          },
        },
        game_11: {
          total_kills: 160,
          players: [
            'Isgalamido',
            'Dono da Bola',
            'Zeh',
            'Oootsimo',
            'Chessus',
            'Assasinu Credi',
            'Mal',
          ],
          kills: {
            Isgalamido: 26,
            'Dono da Bola': 3,
            Zeh: 13,
            Oootsimo: 13,
            Chessus: 13,
            'Assasinu Credi': 20,
            Mal: -6,
          },
          kills_by_means: {
            MOD_TRIGGER_HURT: 37,
            MOD_RAILGUN: 38,
            MOD_ROCKET_SPLASH: 35,
            MOD_BFG_SPLASH: 8,
            MOD_ROCKET: 25,
            MOD_MACHINEGUN: 7,
            MOD_BFG: 8,
            MOD_FALLING: 2,
          },
        },
        game_12: {
          total_kills: 6,
          players: [
            'Isgalamido',
            'Dono da Bola',
            'Zeh',
            'Oootsimo',
            'Chessus',
            'Assasinu Credi',
            'Mal',
          ],
          kills: {
            Isgalamido: -1,
            'Dono da Bola': -1,
            Zeh: 2,
            Oootsimo: 2,
            Chessus: 0,
            'Assasinu Credi': 0,
            Mal: 0,
          },
          kills_by_means: {
            MOD_TRIGGER_HURT: 2,
            MOD_ROCKET: 1,
            MOD_ROCKET_SPLASH: 1,
            MOD_BFG_SPLASH: 1,
            MOD_BFG: 1,
          },
        },
        game_13: {
          total_kills: 122,
          players: [
            'Isgalamido',
            'Dono da Bola',
            'Zeh',
            'Oootsimo',
            'Chessus',
            'Assasinu Credi',
            'Mal',
          ],
          kills: {
            Isgalamido: 22,
            'Dono da Bola': 2,
            Zeh: 5,
            Oootsimo: 9,
            Chessus: 7,
            'Assasinu Credi': 7,
            Mal: -2,
          },
          kills_by_means: {
            MOD_RAILGUN: 20,
            MOD_TRIGGER_HURT: 31,
            MOD_ROCKET: 23,
            MOD_ROCKET_SPLASH: 24,
            MOD_MACHINEGUN: 4,
            MOD_BFG_SPLASH: 10,
            MOD_FALLING: 5,
            MOD_BFG: 5,
          },
        },
        game_14: {
          total_kills: 3,
          players: [
            'Zeh',
            'Assasinu Credi',
            'Dono da Bola',
            'Fasano Agai',
            'Isgalamido',
            'Oootsimo',
          ],
          kills: {
            Zeh: -3,
            'Assasinu Credi': 0,
            'Dono da Bola': 0,
            'Fasano Agai': 0,
            Isgalamido: 0,
            Oootsimo: 0,
          },
          kills_by_means: {
            MOD_TRIGGER_HURT: 3,
          },
        },
        game_15: {
          total_kills: 0,
          players: ['Dono da Bola', 'Oootsimo', 'Isgalamido', 'Assasinu Credi', 'Zeh'],
          kills: {
            'Dono da Bola': 0,
            Oootsimo: 0,
            Isgalamido: 0,
            'Assasinu Credi': 0,
            Zeh: 0,
          },
          kills_by_means: {},
        },
        game_16: {
          total_kills: 13,
          players: [
            'Dono da Bola',
            'Oootsimo',
            'Isgalamido',
            'Assasinu Credi',
            'Zeh',
            'UnnamedPlayer',
            'Mal',
          ],
          kills: {
            'Dono da Bola': -2,
            Oootsimo: 1,
            Isgalamido: 0,
            'Assasinu Credi': -3,
            Zeh: 0,
            UnnamedPlayer: 0,
            Mal: -1,
          },
          kills_by_means: {
            MOD_FALLING: 3,
            MOD_TRIGGER_HURT: 6,
            MOD_RAILGUN: 2,
            MOD_ROCKET_SPLASH: 2,
          },
        },
        game_17: {
          total_kills: 7,
          players: ['Dono da Bola', 'Oootsimo', 'Isgalamido', 'Assasinu Credi', 'Zeh', 'Mal'],
          kills: {
            'Dono da Bola': -1,
            Oootsimo: 0,
            Isgalamido: 1,
            'Assasinu Credi': 2,
            Zeh: 2,
            Mal: -1,
          },
          kills_by_means: {
            MOD_ROCKET_SPLASH: 4,
            MOD_ROCKET: 1,
            MOD_FALLING: 1,
            MOD_TRIGGER_HURT: 1,
          },
        },
        game_18: {
          total_kills: 95,
          players: ['Isgalamido', 'Oootsimo', 'Dono da Bola', 'Assasinu Credi', 'Zeh', 'Mal'],
          kills: {
            Isgalamido: 14,
            Oootsimo: 10,
            'Dono da Bola': 14,
            'Assasinu Credi': 9,
            Zeh: 20,
            Mal: 2,
          },
          kills_by_means: {
            MOD_TRIGGER_HURT: 12,
            MOD_ROCKET: 27,
            MOD_ROCKET_SPLASH: 32,
            MOD_SHOTGUN: 6,
            MOD_RAILGUN: 10,
            MOD_MACHINEGUN: 7,
            MOD_FALLING: 1,
          },
        },
        game_19: {
          total_kills: 3,
          players: ['Isgalamido', 'Oootsimo', 'Dono da Bola', 'Assasinu Credi', 'Zeh', 'Mal'],
          kills: {
            Isgalamido: 0,
            Oootsimo: 1,
            'Dono da Bola': 2,
            'Assasinu Credi': 0,
            Zeh: 0,
            Mal: 0,
          },
          kills_by_means: {
            MOD_ROCKET_SPLASH: 2,
            MOD_ROCKET: 1,
          },
        },
        game_20: {
          total_kills: 131,
          players: ['Isgalamido', 'Oootsimo', 'Dono da Bola', 'Assasinu Credi', 'Zeh', 'Mal'],
          kills: {
            Isgalamido: 17,
            Oootsimo: 22,
            'Dono da Bola': 14,
            'Assasinu Credi': 19,
            Zeh: 19,
            Mal: 6,
          },
          kills_by_means: {
            MOD_ROCKET: 37,
            MOD_TRIGGER_HURT: 14,
            MOD_RAILGUN: 9,
            MOD_ROCKET_SPLASH: 60,
            MOD_MACHINEGUN: 4,
            MOD_SHOTGUN: 4,
            MOD_FALLING: 3,
          },
        },
      });
    });
  });

  describe('When file has two games', () => {
    const inputFile = 'src/assets/qgames.log';
    let output: GameStats;

    before(async () => {
      output = await app.parseLogFile(inputFile);
    });

    it('should expect count equal 2 games', async () => {
      expect(Object.keys(output).length).to.be.eql(2);
    });
  });

  describe('When file has one games', () => {
    const inputFile = 'src/assets/looks-one-game.log';
    let output: GameStats;

    before(async () => {
      output = await app.parseLogFile(inputFile);
    });

    it('should expect some values', async () => {
      expect(output).to.be.eql({
        game_1: {
          total_kills: 0,
          players: ['Isgalamido'],
          kills: {
            Isgalamido: 0,
          },
          kills_by_means: {},
        },
        game_2: {
          total_kills: 4,
          players: ['Dono da Bola', 'Mocinha', 'Isgalamido', 'Zeh'],
          kills: {
            'Dono da Bola': -1,
            Mocinha: 0,
            Isgalamido: 1,
            Zeh: -2,
          },
          kills_by_means: {
            MOD_ROCKET: 1,
            MOD_TRIGGER_HURT: 2,
            MOD_FALLING: 1,
          },
        },
        game_3: {
          total_kills: 105,
          players: ['Dono da Bola', 'Isgalamido', 'Zeh', 'Assasinu Credi'],
          kills: {
            'Dono da Bola': 13,
            Isgalamido: 19,
            Zeh: 20,
            'Assasinu Credi': 13,
          },
          kills_by_means: {
            MOD_TRIGGER_HURT: 9,
            MOD_FALLING: 11,
            MOD_ROCKET: 20,
            MOD_RAILGUN: 8,
            MOD_ROCKET_SPLASH: 51,
            MOD_MACHINEGUN: 4,
            MOD_SHOTGUN: 2,
          },
        },
        game_4: {
          total_kills: 14,
          players: ['Dono da Bola', 'Isgalamido', 'Zeh', 'Assasinu Credi'],
          kills: {
            'Dono da Bola': 0,
            Isgalamido: 2,
            Zeh: 1,
            'Assasinu Credi': 1,
          },
          kills_by_means: {
            MOD_ROCKET: 4,
            MOD_ROCKET_SPLASH: 4,
            MOD_TRIGGER_HURT: 5,
            MOD_RAILGUN: 1,
          },
        },
        game_5: {
          total_kills: 29,
          players: [
            'Fasano Agai',
            'Oootsimo',
            'Isgalamido',
            'Zeh',
            'Dono da Bola',
            'UnnamedPlayer',
            'Maluquinho',
            'Assasinu Credi',
            'Mal',
          ],
          kills: {
            'Fasano Agai': 0,
            Oootsimo: 8,
            Isgalamido: 3,
            Zeh: 7,
            'Dono da Bola': 2,
            UnnamedPlayer: 0,
            Maluquinho: 0,
            'Assasinu Credi': 1,
            Mal: 0,
          },
          kills_by_means: {
            MOD_ROCKET: 5,
            MOD_RAILGUN: 2,
            MOD_SHOTGUN: 4,
            MOD_ROCKET_SPLASH: 13,
            MOD_TRIGGER_HURT: 3,
            MOD_FALLING: 1,
            MOD_MACHINEGUN: 1,
          },
        },
        game_6: {
          total_kills: 130,
          players: [
            'Oootsimo',
            'Isgalamido',
            'Zeh',
            'Dono da Bola',
            'Mal',
            'Assasinu Credi',
            'Chessus!',
            'Chessus',
          ],
          kills: {
            Oootsimo: 20,
            Isgalamido: 16,
            Zeh: 9,
            'Dono da Bola': 12,
            Mal: -3,
            'Assasinu Credi': 22,
            'Chessus!': 0,
            Chessus: 0,
          },
          kills_by_means: {
            MOD_FALLING: 7,
            MOD_TRIGGER_HURT: 20,
            MOD_ROCKET_SPLASH: 49,
            MOD_ROCKET: 29,
            MOD_SHOTGUN: 7,
            MOD_RAILGUN: 9,
            MOD_MACHINEGUN: 9,
          },
        },
        game_7: {
          total_kills: 89,
          players: ['Oootsimo', 'Isgalamido', 'Zeh', 'Dono da Bola', 'Mal', 'Assasinu Credi'],
          kills: {
            Oootsimo: 16,
            Isgalamido: 20,
            Zeh: 12,
            'Dono da Bola': 3,
            Mal: -2,
            'Assasinu Credi': 10,
          },
          kills_by_means: {
            MOD_TRIGGER_HURT: 9,
            MOD_ROCKET: 18,
            MOD_ROCKET_SPLASH: 39,
            MOD_FALLING: 6,
            MOD_RAILGUN: 12,
            MOD_MACHINEGUN: 4,
            MOD_SHOTGUN: 1,
          },
        },
        game_8: {
          total_kills: 67,
          players: [
            'Oootsimo',
            'Isgalamido',
            'Zeh',
            'Dono da Bola',
            'Mal',
            'Assasinu Credi',
            'Chessus!',
            'Chessus',
          ],
          kills: {
            Oootsimo: 9,
            Isgalamido: 1,
            Zeh: 12,
            'Dono da Bola': 2,
            Mal: 3,
            'Assasinu Credi': 10,
            'Chessus!': 0,
            Chessus: 8,
          },
          kills_by_means: {
            MOD_TRIGGER_HURT: 8,
            MOD_ROCKET_SPLASH: 25,
            MOD_SHOTGUN: 1,
            MOD_ROCKET: 17,
            MOD_MACHINEGUN: 3,
            MOD_FALLING: 3,
            MOD_RAILGUN: 10,
          },
        },
        game_9: {
          total_kills: 60,
          players: [
            'Oootsimo',
            'Dono da Bola',
            'Zeh',
            'Chessus',
            'Mal',
            'Assasinu Credi',
            'Isgalamido',
          ],
          kills: {
            Oootsimo: -1,
            'Dono da Bola': 3,
            Zeh: 7,
            Chessus: 5,
            Mal: 1,
            'Assasinu Credi': 3,
            Isgalamido: 6,
          },
          kills_by_means: {
            MOD_TELEFRAG: 25,
            MOD_TRIGGER_HURT: 17,
            MOD_ROCKET: 4,
            MOD_ROCKET_SPLASH: 1,
            MOD_RAILGUN: 7,
            MOD_BFG_SPLASH: 2,
            MOD_BFG: 2,
            MOD_MACHINEGUN: 1,
            MOD_CRUSH: 1,
          },
        },
        game_10: {
          total_kills: 20,
          players: [
            'Dono da Bola',
            'Isgalamido',
            'Zeh',
            'Oootsimo',
            'Chessus',
            'Assasinu Credi',
            'UnnamedPlayer',
            'Mal',
          ],
          kills: {
            'Dono da Bola': -2,
            Isgalamido: 5,
            Zeh: 0,
            Oootsimo: 4,
            Chessus: 0,
            'Assasinu Credi': -3,
            UnnamedPlayer: 0,
            Mal: 0,
          },
          kills_by_means: {
            MOD_TRIGGER_HURT: 7,
            MOD_CRUSH: 1,
            MOD_ROCKET_SPLASH: 4,
            MOD_BFG_SPLASH: 3,
            MOD_MACHINEGUN: 1,
            MOD_RAILGUN: 4,
          },
        },
        game_11: {
          total_kills: 160,
          players: [
            'Isgalamido',
            'Dono da Bola',
            'Zeh',
            'Oootsimo',
            'Chessus',
            'Assasinu Credi',
            'Mal',
          ],
          kills: {
            Isgalamido: 26,
            'Dono da Bola': 3,
            Zeh: 13,
            Oootsimo: 13,
            Chessus: 13,
            'Assasinu Credi': 20,
            Mal: -6,
          },
          kills_by_means: {
            MOD_TRIGGER_HURT: 37,
            MOD_RAILGUN: 38,
            MOD_ROCKET_SPLASH: 35,
            MOD_BFG_SPLASH: 8,
            MOD_ROCKET: 25,
            MOD_MACHINEGUN: 7,
            MOD_BFG: 8,
            MOD_FALLING: 2,
          },
        },
        game_12: {
          total_kills: 6,
          players: [
            'Isgalamido',
            'Dono da Bola',
            'Zeh',
            'Oootsimo',
            'Chessus',
            'Assasinu Credi',
            'Mal',
          ],
          kills: {
            Isgalamido: -1,
            'Dono da Bola': -1,
            Zeh: 2,
            Oootsimo: 2,
            Chessus: 0,
            'Assasinu Credi': 0,
            Mal: 0,
          },
          kills_by_means: {
            MOD_TRIGGER_HURT: 2,
            MOD_ROCKET: 1,
            MOD_ROCKET_SPLASH: 1,
            MOD_BFG_SPLASH: 1,
            MOD_BFG: 1,
          },
        },
        game_13: {
          total_kills: 122,
          players: [
            'Isgalamido',
            'Dono da Bola',
            'Zeh',
            'Oootsimo',
            'Chessus',
            'Assasinu Credi',
            'Mal',
          ],
          kills: {
            Isgalamido: 22,
            'Dono da Bola': 2,
            Zeh: 5,
            Oootsimo: 9,
            Chessus: 7,
            'Assasinu Credi': 7,
            Mal: -2,
          },
          kills_by_means: {
            MOD_RAILGUN: 20,
            MOD_TRIGGER_HURT: 31,
            MOD_ROCKET: 23,
            MOD_ROCKET_SPLASH: 24,
            MOD_MACHINEGUN: 4,
            MOD_BFG_SPLASH: 10,
            MOD_FALLING: 5,
            MOD_BFG: 5,
          },
        },
        game_14: {
          total_kills: 3,
          players: [
            'Zeh',
            'Assasinu Credi',
            'Dono da Bola',
            'Fasano Agai',
            'Isgalamido',
            'Oootsimo',
          ],
          kills: {
            Zeh: -3,
            'Assasinu Credi': 0,
            'Dono da Bola': 0,
            'Fasano Agai': 0,
            Isgalamido: 0,
            Oootsimo: 0,
          },
          kills_by_means: {
            MOD_TRIGGER_HURT: 3,
          },
        },
        game_15: {
          total_kills: 0,
          players: ['Dono da Bola', 'Oootsimo', 'Isgalamido', 'Assasinu Credi', 'Zeh'],
          kills: {
            'Dono da Bola': 0,
            Oootsimo: 0,
            Isgalamido: 0,
            'Assasinu Credi': 0,
            Zeh: 0,
          },
          kills_by_means: {},
        },
        game_16: {
          total_kills: 13,
          players: [
            'Dono da Bola',
            'Oootsimo',
            'Isgalamido',
            'Assasinu Credi',
            'Zeh',
            'UnnamedPlayer',
            'Mal',
          ],
          kills: {
            'Dono da Bola': -2,
            Oootsimo: 1,
            Isgalamido: 0,
            'Assasinu Credi': -3,
            Zeh: 0,
            UnnamedPlayer: 0,
            Mal: -1,
          },
          kills_by_means: {
            MOD_FALLING: 3,
            MOD_TRIGGER_HURT: 6,
            MOD_RAILGUN: 2,
            MOD_ROCKET_SPLASH: 2,
          },
        },
        game_17: {
          total_kills: 7,
          players: ['Dono da Bola', 'Oootsimo', 'Isgalamido', 'Assasinu Credi', 'Zeh', 'Mal'],
          kills: {
            'Dono da Bola': -1,
            Oootsimo: 0,
            Isgalamido: 1,
            'Assasinu Credi': 2,
            Zeh: 2,
            Mal: -1,
          },
          kills_by_means: {
            MOD_ROCKET_SPLASH: 4,
            MOD_ROCKET: 1,
            MOD_FALLING: 1,
            MOD_TRIGGER_HURT: 1,
          },
        },
        game_18: {
          total_kills: 95,
          players: ['Isgalamido', 'Oootsimo', 'Dono da Bola', 'Assasinu Credi', 'Zeh', 'Mal'],
          kills: {
            Isgalamido: 14,
            Oootsimo: 10,
            'Dono da Bola': 14,
            'Assasinu Credi': 9,
            Zeh: 20,
            Mal: 2,
          },
          kills_by_means: {
            MOD_TRIGGER_HURT: 12,
            MOD_ROCKET: 27,
            MOD_ROCKET_SPLASH: 32,
            MOD_SHOTGUN: 6,
            MOD_RAILGUN: 10,
            MOD_MACHINEGUN: 7,
            MOD_FALLING: 1,
          },
        },
        game_19: {
          total_kills: 3,
          players: ['Isgalamido', 'Oootsimo', 'Dono da Bola', 'Assasinu Credi', 'Zeh', 'Mal'],
          kills: {
            Isgalamido: 0,
            Oootsimo: 1,
            'Dono da Bola': 2,
            'Assasinu Credi': 0,
            Zeh: 0,
            Mal: 0,
          },
          kills_by_means: {
            MOD_ROCKET_SPLASH: 2,
            MOD_ROCKET: 1,
          },
        },
        game_20: {
          total_kills: 131,
          players: ['Isgalamido', 'Oootsimo', 'Dono da Bola', 'Assasinu Credi', 'Zeh', 'Mal'],
          kills: {
            Isgalamido: 17,
            Oootsimo: 22,
            'Dono da Bola': 14,
            'Assasinu Credi': 19,
            Zeh: 19,
            Mal: 6,
          },
          kills_by_means: {
            MOD_ROCKET: 37,
            MOD_TRIGGER_HURT: 14,
            MOD_RAILGUN: 9,
            MOD_ROCKET_SPLASH: 60,
            MOD_MACHINEGUN: 4,
            MOD_SHOTGUN: 4,
            MOD_FALLING: 3,
          },
        },
      });
    });
  });

  describe('When meansOfDeathBase', () => {
    it('should be MOD_TRIGGER_HURT when 22', async () => {
      expect(DeathCausesArray[22]).to.be.eql('MOD_TRIGGER_HURT');
    });

    it('should be MOD_RAILGUN when 10', async () => {
      expect(DeathCausesArray[10]).to.be.eql('MOD_RAILGUN');
    });

    it('should be MOD_ROCKET when 6', async () => {
      expect(DeathCausesArray[6]).to.be.eql('MOD_ROCKET');
    });
  });
});
