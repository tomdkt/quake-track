import { expect } from 'chai';

import { GameRepository } from '../../../src/repository/game-repository';
import faker from 'faker';
import { PlayerStats } from '../../../src/interfaces/player-stats';

describe('GameRepository', () => {
  let gameRepository: GameRepository;

  describe('when the repository started', () => {
    before(() => {
      gameRepository = new GameRepository();
    });
    it('should be defined and ok', () => {
      expect(gameRepository).to.be.ok;
    });

    it('player stats should be undefined', () => {
      expect(gameRepository.getPlayerStats()).to.be.eql(undefined);
    });

    it('game state should be an empty object', () => {
      expect(gameRepository.getGameStats()).to.be.eql({});
    });
  });

  describe('when initNewGame', () => {
    before(() => {
      gameRepository = new GameRepository();
      gameRepository.initNewGame();
    });

    it('should have expected values', async () => {
      expect(gameRepository.getPlayerNames()).to.be.eql({});
      expect(gameRepository.getGameStats()).to.be.eql({
        game_1: {
          kills: {},
          kills_by_means: {},
          players: [],
          total_kills: 0,
        },
      });
    });
  });

  describe('when incrementPoints', () => {
    const id = faker.datatype.number().toString();
    const name = faker.name.findName();
    let output: PlayerStats;

    before(async () => {
      gameRepository = new GameRepository();
      gameRepository.initNewGame();
      gameRepository.addNewPlayer(id, name);
      gameRepository.incrementPoints(id);
      output = gameRepository.getPlayerStats();
    });

    it('should call increase one point', async () => {
      expect(output.kills[name]).to.be.eq(1);
    });
  });

  describe('when reduce points', () => {
    const id = faker.datatype.number().toString();
    const name = faker.name.findName();
    let output: PlayerStats;

    before(async () => {
      gameRepository = new GameRepository();
      gameRepository.initNewGame();
      gameRepository.addNewPlayer(id, name);
      gameRepository.reducePoints(id);
      output = gameRepository.getPlayerStats();
    });

    it('should reduce one point', async () => {
      expect(output.kills[name]).to.be.eq(-1);
    });
  });

  describe('when doesPlayerNotExist', () => {
    describe('when player not exists', () => {
      const id = faker.datatype.number().toString();
      const unknownId = 'unknownId';
      const name = faker.name.findName();
      let output: boolean;

      before(async () => {
        gameRepository = new GameRepository();
        gameRepository.initNewGame();
        gameRepository.addNewPlayer(id, name);
        gameRepository.reducePoints(id);
        output = gameRepository.doesPlayerNotExist(unknownId);
      });

      it('should be true', async () => {
        expect(output).to.be.true;
      });
    });

    describe('when player exists', () => {
      const id = faker.datatype.number().toString();
      const name = faker.name.findName();
      let output: boolean;

      before(async () => {
        gameRepository = new GameRepository();
        gameRepository.initNewGame();
        gameRepository.addNewPlayer(id, name);
        gameRepository.reducePoints(id);
        output = gameRepository.doesPlayerNotExist(id);
      });

      it('should be falsy', async () => {
        expect(output).to.be.false;
      });
    });
  });

  describe('when increment total kills', () => {
    let output: PlayerStats;

    before(async () => {
      gameRepository = new GameRepository();
      gameRepository.initNewGame();
      gameRepository.incrementTotalKills();
      output = gameRepository.getPlayerStats();
    });

    it('should increase one point on total kills', async () => {
      expect(output.total_kills).to.be.eq(1);
    });
  });

  describe('when incrementKillsByMean', () => {
    const id = '1';
    let output: PlayerStats;

    before(async () => {
      gameRepository = new GameRepository();
      gameRepository.initNewGame();
      gameRepository.incrementKillsByMean(id);
      output = gameRepository.getPlayerStats();
    });

    it('should return expected value', async () => {
      expect(output.kills_by_means).to.be.eql({ MOD_SHOTGUN: 1 });
    });
  });
});
