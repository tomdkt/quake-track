import { expect } from 'chai';
import { DeathCausesArray, GameStats, ParseLogController } from '../src/app';
import {
  expectedFileWithOneGameAnotherRound,
  expectedTheFileContainsOneGame,
  expectedTheFileContainsTwoGames,
  expectedOnFullFileProcessing,
} from './fixture/qgames.fixture';

describe('ParseLogController', () => {
  const baseFolder = 'src/assets';
  let app: ParseLogController;

  before(() => {
    app = new ParseLogController();
  });

  describe('when the app is started', () => {
    it('should be defined and ok', () => {
      expect(app).to.be.ok;
    });
  });

  describe('when parse log file', () => {
    const shouldExpectSpecificValues = 'should expect specific values';

    describe('when process the whole file', () => {
      const inputFile = 'qgames.log';
      let output: GameStats;

      before(async () => {
        output = await app.parseLogFile(`${baseFolder}/${inputFile}`);
      });

      it(shouldExpectSpecificValues, async () => {
        expect(output).to.be.eql(expectedOnFullFileProcessing);
      });
    });

    describe('when the user self destruct', () => {
      const inputFile = 'user-self-destruct.log';
      let output: GameStats;

      before(async () => {
        output = await app.parseLogFile(`${baseFolder}/${inputFile}`);
      });

      it(shouldExpectSpecificValues, async () => {
        expect(output).to.be.eql({
          game_1: {
            total_kills: 3,
            players: ['Isgalamido'],
            playerNames: {
              '2': 'Isgalamido',
            },
            kills: {
              Isgalamido: -3,
            },
            kills_by_means: {
              MOD_ROCKET_SPLASH: 2,
              MOD_TRIGGER_HURT: 1,
            },
          },
        });
      });
    });

    describe('when the user name is changed', () => {
      const inputFile = 'user-name-changed.log';
      let output: GameStats;

      before(async () => {
        output = await app.parseLogFile(`${baseFolder}/${inputFile}`);
      });

      it(shouldExpectSpecificValues, async () => {
        expect(output).to.be.eql({
          game_1: {
            total_kills: 11,
            players: ['Isgalamido', 'Dono da Bola'],
            playerNames: {
              '2': 'Isgalamido',
              '3': 'Dono da Bola',
            },
            kills: {
              Isgalamido: -9,
              'Dono da Bola': 0,
            },
            kills_by_means: {
              MOD_TRIGGER_HURT: 7,
              MOD_ROCKET_SPLASH: 3,
              MOD_FALLING: 1,
            },
          },
        });
      });
    });

    describe('when the file contains one game', () => {
      describe('one round', () => {
        const inputFile = 'one-game-one-round.log';
        let output: GameStats;

        before(async () => {
          output = await app.parseLogFile(`${baseFolder}/${inputFile}`);
        });

        it(shouldExpectSpecificValues, async () => {
          expect(output).to.be.eql(expectedTheFileContainsOneGame);
        });
      });

      describe('another round', () => {
        const inputFile = 'one-game-another-round.log';
        let output: GameStats;

        before(async () => {
          output = await app.parseLogFile(`${baseFolder}/${inputFile}`);
        });

        it(shouldExpectSpecificValues, async () => {
          expect(output).to.be.eql(expectedFileWithOneGameAnotherRound);
        });
      });
    });

    describe('when the file contains two games', () => {
      const inputFile = 'two-games-on-same-file.log';
      let output: GameStats;

      before(async () => {
        output = await app.parseLogFile(`${baseFolder}/${inputFile}`);
      });

      it(shouldExpectSpecificValues, async () => {
        expect(output).to.be.eql(expectedTheFileContainsTwoGames);
      });
    });
  });

  describe('when meansOfDeathBase', () => {
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
